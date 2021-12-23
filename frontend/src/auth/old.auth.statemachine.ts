import { createMachine, interpret, send, } from "xstate";

import { inspect } from '@xstate/inspect'
// TODO: Remove from prodution builds
inspect({ iframe: false });

export class AuthStorage {
	static setToken(
		{ refreshToken, accessToken }: { refreshToken?: string, accessToken?: string}
	) {
		refreshToken && localStorage.setItem('refreshToken', refreshToken);
		accessToken && localStorage.setItem('accessToken', accessToken);
	}

	/** Checks localStorage for valid refreshToken, if any are present it returns tru **/
	static isAuthenticated(): boolean {
		const refreshToken = localStorage.getItem('refreshToken');

		// TODO: check if the accessToken is valid
		return refreshToken !== null;
	}
};

const authMachine = createMachine({
	id: 'auth',
	initial: 'unauthenticated',

	states: {
		unauthenticated: {
			on: {
				'ATTEMPT_GOOGLE_AUTH': {
					target: 'authenticatingWithGoogle',
				}
			}
		},
		authenticatingWithGoogle: {
			on: {
				'REPORT_GOOGLE_AUTH_SUCCESS': {
					target: 'authenticated',	
				}
			},
			initial: 'verifying',
			states: {
				verifying: {
					invoke: {
						id: 'getTokens',
						src: 'exchangeTokenGoogle',
						onDone: {
							target: 'authenticated',
						},
						onError: '',
					},
				},
			},
		},
		authenticated: {

		},
	}
}, {
	services: {
		exchangeTokenGoogle: async (_context, event) => {
			const { tokenId } = event;

			const response = await fetch(`http://localhost:8080/auth/google/exchange`, {
				method: 'POST',
				body: JSON.stringify({
					token: tokenId,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if(response.ok) {
				return await response.json();	
			} else {
				throw 'error';
			}
		},
	},
	actions: {
		// /**
		//  * Get refresh and access token from backend
		//  **/
		// authenticateGoogle: async (_context, event) => {
		// 	// Exract the tokenId from the event
		// 	const { tokenId  } = event;
		//
		// 	// Get the tokens from the server
		// 	const response = await fetch(`http://localhost:8080/auth/google/exchange`, {
		// 		method: 'POST',
		// 		body: JSON.stringify({
		// 			token: tokenId,
		// 		}),
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	});
		//
		// 	if(response.ok) {
		// 		const tokens = await response.json();
		// 		AuthStorage.setToken(tokens);
		// 		send('REPORT_GOOGLE_AUTH_SUCCESS');
		// 	} else {
		// 		console.log('REPORT_GOOGLE_AUTH_NO_LINKED_ACCOUNT');
		// 		send('REPORT_GOOGLE_AUTH_NO_LINKED_ACCOUNT');
		// 	}
		// },
	},
});

// Lookup the jwt from localstorage, to see if it exists and is valid
// set the intial state to this
export const authService = interpret(
	authMachine,
	{ devTools: true },
).start(AuthStorage.isAuthenticated() ? 'authenticated': 'unauthenticated');

/**
 * Get the tokenId from the identity provider exchange it for set of tokens if an account with this id exists.
 **/
function handleLogin(provider: string) {
	return function(response: { tokenId: string} ) {
		const tokenId = response.tokenId;
		authService.send(`ATTEMPT_${provider.toUpperCase()}_AUTH`, { tokenId });
	}
}

export const handleGoogleLogin = handleLogin('google');
