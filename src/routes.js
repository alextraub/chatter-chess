/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import PrivacyPolicy from './components/PrivacyPolicy';
import GameContainer from './components/GameContainer';
import { SignInForm, SignUpForm, ResendVerificationForm, ForgotPasswordForm } from './components/auth';
import AuthType from './types/AuthType';
import { Route } from 'react-router-dom';
import Page from './components/Page';

const routes = [
	{
		path: '/',
		exact: true,
		component: props => <GameContainer {...props} />,
		authType: AuthType.AUTH_ONLY,
		page: {
			centered: false,
			noAccountButton: false
		}
	},
	{
		path: '/privacy',
		exact: true,
		component: props => <PrivacyPolicy {...props} />,
		authType: AuthType.ANY,
		page: {
			centered: false,
			noAccountButton: false
		}
	},
	{
		path: '/signin',
		exact: true,
		component: props => <SignInForm {...props} />,
		authType: AuthType.UNAUTH_ONLY,
		page: {
			centered: true,
			noAccountButton: true
		}
	},
	{
		path: '/signup',
		exact: true,
		component: props => <SignUpForm {...props} />,
		authType: AuthType.UNAUTH_ONLY,
		page: {
			centered: true,
			noAccountButton: true
		}
	},
	{
		path: '/resend-verification',
		exact: true,
		component: props => <ResendVerificationForm {...props} />,
		authType: AuthType.ANY,
		page: {
			centered: true,
			noAccountButton: false
		}
	},
	{
		path: '/forgot-password',
		exact: true,
		component: props => <ForgotPasswordForm {...props} />,
		authType: AuthType.UNAUTH_ONLY,
		page: {
			centered: true,
			noAccountButton: false
		}
	}
].map(({ path, component, exact, authType, page: { centered, noAccountButton } }) => (
	<Route exact={exact} key={path} path={path} render={props => (
		<Page {...props} authType={authType} centered={centered} noAccountButton={noAccountButton}>
			{component(props)}
		</Page>
	)} />
));

export default routes;
