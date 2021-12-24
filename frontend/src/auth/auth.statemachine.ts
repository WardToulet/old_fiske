import { assign, createMachine, interpret } from 'xstate';
import { inspect } from '@xstate/inspect';

inspect({ iframe: false });

interface AuthContext {};

type AuthEvent =
	| { type: 'TRY_AUTHENTICATE_GOOGLE', tokenId: string }
	| { type: 'REPORT_AUTHENTICATED', accessToken: string, refreshToken: string }
	| { type: 'REPORT_LOGOUT' }
	| { type: 'TRY_CREATE_ACCOUNT' }

type AuthTypestate = 
	| { value: 'unauthenticated' }
	| {
		value: 'authenticateGoogle',
		context: {
			tokenId: string
		}
	} 
	| {
		value: 'authenticated',
		context: TokenDTO,
	};

type TokenDTO = {
			accessToken: string,
			refreshToken: string,
}

const authMachine = createMachine<AuthContext, AuthEvent, AuthTypestate>(
	{
		id: 'authMachine',
		context: {
			tokenId: undefined,
			refreshToken: undefined,
			accessToken: undefined,
		},
		initial: 'unauthenticated',
		states: {
			unauthenticated: {
				on: {
					'TRY_AUTHENTICATE_GOOGLE': {
						target: 'authenticateGoogle',
						actions: assign({
							tokenId: (_context, event) => event.tokenId,
						}),
					},
					'TRY_CREATE_ACCOUNT': {
						target: 'createAccount',
					}
				},
				meta: { path: '/login' }
			},

			authenticateGoogle: {
				initial: 'tryAuthentication',
				states: {
					tryAuthentication: {
						invoke: {
							id: 'getGoogleTokens',
							src: 'getGoogleTokens',
							onDone: [
								{
									target: '#authMachine.authenticated',
									cond: 'isRegistered',
								},
								{
									target: 'noLinkedAccount',
								},
							],
							onError: {

							},
						},
					},

					noLinkedAccount: {
						tags: [ 'noLinkedAccount' ]
					},
				},
			},
			authenticated: {
				on: {
					'REPORT_LOGOUT': {
						target: 'unauthenticated'
					}
				},
			},
			createAccount: {
				meta: { path: '/register' }
			},
		},
	},
	{
		services: {
			getGoogleTokens: (context, event) => {
				return fetch('http://localhost:8080/auth/google/exchange', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: context.tokenId,
					}),
				})
				.then(res => Promise.all([res.status, res.json()]))
				.then(([ status, response ]) => status == 201
					? {
						isRegistered: true,
						tokens: response
					}
					: {
						isRegistered: false,
						...response
					}
				);
			},
		},
		guards: {
			isRegistered: (_context, event: { data: { isRegistered: boolean }}) => event.data.isRegistered,
		},
		actions: {
			
		},
	},
);



/// TODO: check local storage to set initial state
export const authService = interpret(authMachine, { devTools: false }).start();

export const handleGoogleLogin = (tokenId) => 
	authService.send('TRY_AUTHENTICATE_GOOGLE', { tokenId })

export const handleCreateAccount = () => authService.send('TRY_CREATE_ACCOUNT');
