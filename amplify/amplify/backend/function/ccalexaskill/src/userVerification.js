const Axios = require('axios');
const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

const region =process.env.REGION;
if(!region) {
	throw new Error('Missing env var for lambda region');
}

const userPoolId = process.env.AUTH_ACCOUNTS_USERPOOLID;
if(!userPoolId) {
	throw new Error('Missing env var for cognito user pool ID');
}

const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

let cacheKeys;
const getPublicKeys = async () => {
	if (!cacheKeys) {
		const url = `${cognitoIssuer}/.well-known/jwks.json`;
		const publicKeys = await Axios.default.get(url);
		cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
			const pem = jwkToPem(current);
			agg[current.kid] = {instance: current, pem};
			return agg;
		}, {});
		return cacheKeys;
	} else {
		return cacheKeys;
	}
};

module.exports = async function(event, context) {
	let result;
	try {
		const { user } = event.context.System;
		console.log(`user claim verfiy invoked for ${JSON.stringify(user)}`);
		const token = user.accessToken;
		const tokenSections = (token || '').split('.');
		if (tokenSections.length < 2) {
			throw new Error('requested token is invalid');
		}
		const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
		const header = JSON.parse(headerJSON);
		const keys = await getPublicKeys();
		const key = keys[header.kid];
		if (key === undefined) {
			throw new Error('claim made for unknown kid');
		}
		const claim = await jsonwebtoken.verify(token, key.pem);
		const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
		if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
			throw new Error('claim is expired or invalid');
		}
		if (claim.iss !== cognitoIssuer) {
			throw new Error('claim issuer is invalid');
		}
		if (claim.token_use !== 'access') {
			throw new Error('claim use is not access');
		}
		console.log(`claim confirmed for ${claim.username}`);
		result = {userName: claim.username, clientId: claim.client_id, isValid: true};
	} catch (error) {
		result = {userName: '', clientId: '', error, isValid: false};
	}
	return result;
}
