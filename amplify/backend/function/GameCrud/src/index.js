
/* Amplify Params - DO NOT EDIT
	API_GAMES_GRAPHQLAPIENDPOINTOUTPUT
	API_GAMES_GRAPHQLAPIIDOUTPUT
	AUTH_ACCOUNTS_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_GAMES_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const queries = require('./queries');
const { print } = require('graphql');

const getGame = print(queries.query);
const updateGame = print(queries.mutation);



exports.handler = async event => {
	const generateBody = (mutate, variables) => {
		if(mutate) {
			return JSON.stringify({
				query: updateGame,
				operationName: 'UpdateGame',
				variables: {
					input: variables
				},
				authMode: "AWS_IAM"
			});
		} else {
			return JSON.stringify({
				query: getGame,
				operationName: 'GetGame',
				variables: variables,
				authMode: "AWS_IAM"
			});
		}
	}

	const { mutate, variables } = event;
	if(typeof(mutate) !== 'boolean') {
		return {
			statusCode: 400,
			body: {
				message: "Expected mutate to be a boolean"
			}
		}
	}

	const req = new AWS.HttpRequest(appsyncUrl, region);

	req.method = "POST";
	req.path = "/graphql";
	req.headers.host = endpoint;
	req.headers["Content-Type"] = "application/json";

	req.body = generateBody(mutate, variables);
	console.log(req.body);
	const signer = new AWS.Signers.V4(req, "appsync", true);
	signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

	try {
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
	} catch (err) {
		console.log(err);
	}
};
