const Alexa = require('ask-sdk');

module.exports = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'MoveIntent';
	},
	handle(handlerInput) {
		let speakOutput = 'I can do that!';
		const x = handlerInput.requestEnvelope.request.intent;
		if (x.confirmationStatus === 'CONFIRMED') {
			const {from, to} = x.slots;
			speakOutput = `Moving ${from.value} to ${to.value}`;
		} else {
			speakOutput = 'I will not make that move';
		}
		return handlerInput.responseBuilder
			.speak(speakOutput)
			.getResponse();
	}
};
