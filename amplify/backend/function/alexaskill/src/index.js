/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = require('./handlers/launchRequestIntentHandler');
const HelloWorldIntentHandler = require('./handlers/helloWorldIntentHandler');
const HelpIntentHandler = require('./handlers/helpIntentHandler');
const CancelAndStopIntentHandler = require('./handlers/cancelAndStopIntentHandler');
const SessionEndedRequestHandler = require('./handlers/sessionEndedRequestHandler');
const ErrorHandler = require('./handlers/errorHandler');

let skill;

exports.handler = async function (event, context) {
	// TODO implement
	console.log(`REQUEST++++${JSON.stringify(event)}`);

	if (!skill) {
		skill = Alexa.SkillBuilders.custom()
			.addRequestHandlers(
				LaunchRequestHandler,
				HelloWorldIntentHandler,
				HelpIntentHandler,
				CancelAndStopIntentHandler,
				SessionEndedRequestHandler
			)
			.addErrorHandlers(ErrorHandler)
			.create();
	}

	const response = await skill.invoke(event, context);
	console.log(`RESPONSE++++${JSON.stringify(response)}`);

	return response;

};
