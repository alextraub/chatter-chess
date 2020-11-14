/* Amplify Params - DO NOT EDIT
	API_CHATTERCHESS_GRAPHQLAPIENDPOINTOUTPUT
	API_CHATTERCHESS_GRAPHQLAPIIDOUTPUT
	API_CHATTERCHESS_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async event => {
	// TODO implement
	const response = {
		statusCode: 200,
		//  Uncomment below to enable CORS requests
		//  headers: {
		//      "Access-Control-Allow-Origin": "*"
		//  },
		body: JSON.stringify('Hello from Lambda!')
	};
	return response;
};
