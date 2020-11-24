import 'jquery/dist/jquery.slim';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from "aws-amplify";
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

let isDevelopment = false;
try {
	isDevelopment = process.env.NODE_ENV === 'development';
} catch (err) {
	console.error('Autherization source is not allowed');
}

const isLocalhost = isDevelopment && (
	window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

if(isLocalhost) {
	Amplify.Auth._config.oauth = {
		...Amplify.Auth._config.oauth,
		redirectSignIn: 'http://localhost:3000/',
		redirectSignOut: 'http://localhost:3000/'
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
