module.exports = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput) {
		const speechText = 'Welcome to Chatter Chess! What would you like to do?';

		const accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt('Say help to learn what you can do.')
			.getResponse();
	}
};
