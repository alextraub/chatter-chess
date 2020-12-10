/* Amplify Params - DO NOT EDIT
	API_GAMES_GRAPHQLAPIENDPOINTOUTPUT
	API_GAMES_GRAPHQLAPIIDOUTPUT
	AUTH_ACCOUNTS_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const Alexa = require('ask-sdk');
const LaunchRequestHandler = require('./handlers/launchRequestIntentHandler');
const HelpIntentHandler = require('./handlers/helpIntentHandler');
const CancelAndStopIntentHandler = require('./handlers/cancelAndStopIntentHandler');
const SessionEndedRequestHandler = require('./handlers/sessionEndedRequestHandler');
const ErrorHandler = require('./handlers/errorHandler');
const MoveIntentHandler = require('./handlers/moveIntentHandler');

const userVerification = require('./userVerification');

let skill;
let user;
exports.handler = async function (event, context) {
	// TODO implement
	if(!user) {
		try {
			user = await userVerification(event, context);
		} catch (err) {
			console.log(err);
		}
	}

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
