import "../node_modules//bootstrap/dist/css/bootstrap.min.css";
import 'jquery/dist/jquery.slim';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from "aws-amplify";
import awsConfig from "./awsConfig";
import AuthProvider from './components/auth/AuthProvider';

Amplify.configure(awsConfig);

ReactDOM.render(
	<AuthProvider>
		<App />
	</AuthProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
