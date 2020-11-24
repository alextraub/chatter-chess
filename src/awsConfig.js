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

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
	localRedirectSignIn,
	productionRedirectSignIn
] = awsConfig.oauth.redirectSignIn.split(",");

const [
	localRedirectSignOut,
	productionRedirectSignOut
] = awsConfig.oauth.redirectSignOut.split(",");

const modifiedConfig = {
	...awsConfig,
	oauth: {
		...awsConfig.oauth,
		redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
		redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut
	}
}

console.log(awsConfig);

export default modifiedConfig;
