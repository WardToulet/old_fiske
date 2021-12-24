import {  createMachine, assign } from 'xstate';

interface RegisterContext {
	isValid: boolean,
	code?: string ,
};

type RegisterEvent = 
	| { event: 'CHECK_CODE', code: string };

type RegisterTypestate = unknown;

export const registerMachine = createMachine<RegisterContext, AuthEvent, AuthTypestate>(
	{
		id: 'registerMachine',
		context: {
			code: undefined,
			isValid: false,
		},
		initial: 'enteringCode',
		states: {
			enteringCode: {
				on: { 
					'CHECK_CODE': { 
						target: 'localCodeCheck',
						actions: assign({
							code: (_, event) => event.code,
						})
					},
				},
			},
			localCodeCheck: {
				tags: [ 'checking' ],
				always: [
					{ 
						target: 'serverCodeCheck',
						cond: 'isValidCodeFormat',
					},
					{
						target: 'enteringCode',
						actions: assign({
							isValid: false,
						}),
					},
				],
				on: {
					'CHECK_CODE': {
						target: 'localCodeCheck',
						actions: assign({
							code: (_, event) => event.code,
						})
					}
				}
			},
			serverCodeCheck: {
				tags: [ 'checking' ],
				on: {
					'CHECK_CODE': {
						target: 'localCodeCheck',
						actions: assign({
							code: (_, event) => event.code,
						})
					}
				}
			},
			validCode: {

			},
		},
	},
	{
		services: {
		},
		guards: {
			/**
			 * Checks if the code entered follows the conventions of the code
			 **/
			isValidCodeFormat: ({ code }, _value) => {
				return code.length == 24;
			}
		},
		actions: {
		},
	},
);
