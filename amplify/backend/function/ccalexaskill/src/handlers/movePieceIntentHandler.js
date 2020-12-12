const Alexa = require('ask-sdk');

module.exports = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'MovePieceIntent';
	},
	handle(handlerInput) {
		const x = handlerInput.requestEnvelope.request.intent;
		const {piece, to} = x.slots;
		let speakOutput = `Moving ${piece.value} to ${to.value}`;
		return handlerInput.responseBuilder
			.speak(speakOutput)
			//.reprompt('add a reprompt if you want to keep the session open for the user to respond')
			.getResponse();
	}
};