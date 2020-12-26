/* Amplify Params - DO NOT EDIT
	API_GAMES_GRAPHQLAPIENDPOINTOUTPUT
	API_GAMES_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_GAMES_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const query = `
mutation UpdateGame($input: UpdateGameInput!, $condition: ModelGameConditionInput) {
	updateGame(input: $input, condition: $condition) {
		_version
		id
		createdAt
		updatedAt
		owner
		turn
		check {
			BLACK {
				mate
				status
			}
			WHITE {
				mate
				status
			}
		}
		pieces {
			captured
			player
			position {
				col
				row
			}
			type
		}
	}
}`;

exports.handler = async event => {
	console.log(event);
	const req = new AWS.HttpRequest(appsyncUrl, region);

	req.method = "POST";
	req.path = "/graphql";
	req.headers.host = endpoint;
	req.headers["Content-Type"] = "application/json";
	req.body = JSON.stringify({
		query,
		operationName: "UpdateGame",
		variables: event.variables
	});

	const signer = new AWS.Signers.V4(req, "appsync", true);
	signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

	const data = await new Promise((resolve, reject) => {
		const httpRequest = https.request({ ...req, host: endpoint }, result => {
			result.on('data', data => {
				resolve(JSON.parse(data.toString()));
			});
		});

		httpRequest.write(req.body);
		httpRequest.end();
	});

	return {
		statusCode: 200,
		body: data
	};
};
