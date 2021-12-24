import { FunctionalComponent } from "preact";
import { useEffect } from "preact/compat";
import { Link, useLocation } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { registerMachine } from "../../auth/register.statemachine";

export const RegisterPartial: FunctionalComponent = () => {
	const [ state, send ] = useMachine(registerMachine, { devTools: true })

	const checkCode = (code: string) => send('CHECK_CODE', { code });

	const code = new URLSearchParams(useLocation().search).get('code');
	useEffect(() => {
		if(code) {
			// If the code is set by the query parameter
			// the check funnctionality should be triggerd imediately
			checkCode(code);
		}
	}, [ code ]);
	
	return (
		<article class="grid gap-4">
			<section className="grid gap-2">
				<h1 className="text-xl font-semibold">Registeren</h1>

				<p className="text-sm text-gray-600">
					Om te je kunnen registeren bij fiske kreeg je een code
				</p>

				{
					state.context.isValid || 'invalid'
				}

				<input 
					type="" 
					aria-invalid={!state.context.isValid}
					className={`border rounded shadow py-2 text-center text-lg ${!state.context.isValid && 'border-red-800'}`}
					placeholder="code"
					value={code}
					onChange={(e) => checkCode(e.target.value)}
				/>

			</section>

			<hr />

			<section className="grid gap-1 text-center">
				<h1 className="text-xs text-gray-600">Heb je al een account?</h1>
				<Link className="text-sm text-blue-600 hover:text-blue-900" to="/login">Login</Link>
			</section>
		</article>
	);
}
