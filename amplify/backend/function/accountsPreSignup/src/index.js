/*
A lambda function that automatically links any OAuth signups with a user with the same email, if one exists, otherwise the auth flow continues
as it normally would.
*/

const AWS = require('aws-sdk');

const idp = new AWS.CognitoIdentityServiceProvider();

/* Get a promise which when resolved will give a resource object with an array of CognitoUsers within the specified user pool with the specified email */
const getUserByEmail = async (userPoolId, email) => {
	return idp.listUsers({
		UserPoolId: userPoolId,
		Filter: `email = "${email}"`
	}).promise();
}

const addProviderToExistingUser = async (username, userPoolId, provider, userId) => {
	const params = {
		DestinationUser: {
			ProviderAttributeValue: username,
			ProviderName: 'Cognito'
		},
		SourceUser: {
			ProviderAttributeName: 'Cognito_Subject',
			ProviderAttributeValue: userId,
			ProviderName: provider
		},
		UserPoolId: userPoolId
	};

	const result = await (new Promise((resolve, reject) => {
		idp.adminLinkProviderForUser(params, (err, data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(data)
		})
	}))

	return result;
}

exports.handler = async (event, context, callback) => {
	if(event.triggerSource === 'PreSignUp_ExternalProvider') {
		if(event.request.userAttributes.email) {
			const { email } = event.request.userAttributes;
			const { userPoolId } = event;

			const usersResource = await getUserByEmail(userPoolId, email);
			if(usersResource && usersResource.Users.length > 0) {
				const [ provider, userId ] = event.userName.split('_');
				try {
					await addProviderToExistingUser(
						usersResource.Users[0].Username,
						userPoolId,
						provider,
						userId
					);
				} catch (err) {
					console.log(err);
				}
			} else {
				console.log(`New user signed in via OAuth with email ${email}`);
			}
		}
	}

	return callback(null, event);
}
