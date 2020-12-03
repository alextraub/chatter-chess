module.exports = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput) {
		const speechText = 'Welcome to Chatter Chess!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt('What would you like to do?')
			.getResponse();
	}
};
