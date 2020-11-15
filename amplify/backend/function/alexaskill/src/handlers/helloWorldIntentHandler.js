module.exports = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
	},
	handle(handlerInput) {
		const speechText = 'Hello and welcome to Chatter Chess!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Hello and welcome to Chatter Chess!', speechText)
			.getResponse();
	}
};
