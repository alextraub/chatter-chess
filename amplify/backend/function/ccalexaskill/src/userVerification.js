const Axios = require('axios');
const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

const userPoolId = process.env.AUTH_ACCOUNTS_USERPOOLID;

const cognitoIssuer = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${userPoolId}`;

let cachedKeys;
const getPublicKeys = async () => {
	const publicKeys = await Axios.default.get(`${cognitoIssuer}/.well-known/jwks.json`);
	return publicKeys.data.keys.reduce((agg, current) => {
		const pem = jwkToPem(current);
		agg[current.kid] = {instance: current, pem};
		return agg;
	}, {});
};

module.exports = async function(event, context) {
	let result;
	try {
		const { user } = event.context.System;
		const token = user.accessToken;
		const tokenSections = (token || '').split('.');
		if (tokenSections.length < 2) {
			throw new Error('requested token is invalid');
		}
		const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
		const header = JSON.parse(headerJSON);
		if(!cachedKeys) {
			cachedKeys = await getPublicKeys();
		}

		const key = cachedKeys[header.kid];
		if (key === undefined) {
			throw new Error('claim made for unknown kid');
		}
		const claim = await jsonwebtoken.verify(token, key.pem);
		console.log(claim);
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
