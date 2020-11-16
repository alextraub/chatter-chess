import awsConfig from './aws-exports';

const isLocalhost =
	window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
;

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
	productionRedirectSignIn,
	localRedirectSignIn
] = awsConfig.oauth.redirectSignIn.split(",");

const [
	productionRedirectSignOut,
	localRedirectSignOut
] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
	...awsConfig,
	oauth: {
		...awsConfig.oauth,
		redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
		redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut
	}
}

export default updatedAwsConfig;
