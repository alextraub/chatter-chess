/* Amplify Params - DO NOT EDIT
	API_GAMES_GRAPHQLAPIENDPOINTOUTPUT
	API_GAMES_GRAPHQLAPIIDOUTPUT
	AUTH_ACCOUNTS_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const Alexa = require('ask-sdk');
const createRemoteJWKSet = require('jose/jwks/remote').default;
const jwtVerify = require('jose/jwt/verify').default;

const LaunchRequestHandler = require('./handlers/launchRequestIntentHandler');
const HelpIntentHandler = require('./handlers/helpIntentHandler');
const CancelAndStopIntentHandler = require('./handlers/cancelAndStopIntentHandler');
const SessionEndedRequestHandler = require('./handlers/sessionEndedRequestHandler');
const ErrorHandler = require('./handlers/errorHandler');
const MoveIntentHandler = require('./handlers/moveIntentHandler');

let JWKS;

let skill;
exports.handler = async function (event, context) {
	// TODO implement
	// const { user } = event.context.System;
	// const token = user.accessToken;
	// if(!JWKS) {
	// 	console.log('Getting jwks...');
	// 	try {
	// 		JWKS = createRemoteJWKSet(new URL(`https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.AUTH_ACCOUNTS_USERPOOLID}/.well-known/jwks.json`));
	// 		console.log('Finished getting jwks.');
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	if (!skill) {
		skill = Alexa.SkillBuilders.custom()
			.addRequestHandlers(
				LaunchRequestHandler,
				HelpIntentHandler,
				CancelAndStopIntentHandler,
				SessionEndedRequestHandler,
				MoveIntentHandler
			)
			.addErrorHandlers(ErrorHandler)
			.create();
	}

	const response = await skill.invoke(event, context);

	return response;

};
