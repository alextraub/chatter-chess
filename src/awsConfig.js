import awsConfig from './aws-exports';

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

const newOauth = isDevelopment ? {
	...awsConfig.oauth,
	redirectSignIn: 'http://localhost:3000/',
	redirectSignOut: 'http://localhost:3000/'
} : awsConfig.oauth;

const modifiedConfig = {
	...awsConfig,
	oauth: newOauth,
	Auth: {
		identityPoolId: "us-east-1:1791e9e0-699f-4664-9320-8744ddec4ca9"
	}
}

export default modifiedConfig;
