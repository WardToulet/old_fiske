import { FunctionalComponent } from "preact";
import { Routes, Route } from "react-router-dom";

import { LoginPartial } from './login.partial';
import { RegisterPartial } from './register.partial';

export const AuthPage: FunctionalComponent = () => {
	return (
		<div class="p-4 grid place-content-center">
			<div className="bg-white shadow rounded p-4 dividy-y md:max-w-lg w-80 w-full">
				<Routes>
					<Route path="/login" element={<LoginPartial />} />
					<Route path="/register" element={<RegisterPartial />} />
				</Routes>
			</div>
		</div>
	)
}
		// <div class="p-4 grid place-content-center gap-2">
		// 	{ state.matches('unauthenticated') &&
		// 		<div class="grid gap-4 bg-white shadow rounded p-4 divide-y max-w-lg">
		// 			<section class="grid gap-4" aria-label="login">
		// 				<h1 class="text-2xl font-medium">Login</h1>
		//
		// 				<p class="text-gray-800 text-sm text-justify">
		// 					Elit atque recusandae beatae nesciunt possimus Nobis quasi eius odit tempora alias hic. Facere dicta itaque perferendis sed possimus Pariatur ducimus aspernatur aut rerum quod Similique autem quaerat officia dolorem
		// 				</p>
		//
		// 				<GoogleLogin />
		// 			</section>
		// 			<section class="grid text-center pt-4" aria-label="register">
		// 				<h1 class="text-sm text-gray-800">Geen account?</h1>
		// 				<a class="text-blue-600 font-medium hover:text-blue-900" href="">
		// 					Maak een account aan
		// 				</a>
		// 			</section>
		// 		</div>
		// 	}
		//
		// 	{ state.hasTag('noLinkedAccount') &&
		// 		<div class="grid gap-4 bg-white shadow rounded p-4 divide-y max-w-lg">
		// 				<section class="grid gap-4">
		// 					<h1 class="text-2xl font-medium">Geen gelinkte account</h1>
		// 					<p class="text-gray-800 text-sm text-justify">
		// 						Er is geen profiel gelinkt aan je account.
		// 						Om een profiel te linken kreeg je per mail een code van Thila Coloma.
		// 					</p>
		// 					<input 
		// 						type="text" 
		// 						placeholder="code"
		// 						class="px-4 py-2 border rounded text-center"
		// 					/>
		// 				</section>
		// 				<section class="grid text-center pt-4">
		// 					<h1 class="text-sm text-gray-800">Geen link gekregen?</h1>
		// 					<a class="text-blue-600 font-medium hover:text-blue-900" href="mailto:suport@fikse.thilacoloma.be">
		// 						Neem contact met ons op
		// 					</a>
		// 				</section>
		// 		</div>
		// 	}
		//
		// </div>
		// <div class="grid gap-2 p-4 content-center">
		//
		// 	{ 
		// 		state.matches('authenticateGoogle.noLinkedAccount') &&
		// 		<>
		// 			Het account waarme je inlogde is niet gelinkt aan een fike account
		// 			<div>
		// 				<button>Account koppelen</button>
		// 			</div>
		// 		</>
		// 	}
		//
		// 	{
		// 		state.matches('unauthenticated') && 
		// 		<div>
		// 			<GoogleLogin />
		// 		</div>
		// 	}
		// 	
		// 	{
		// 		state.matches('authenticated') &&
		// 		<>
		// 			Welcome
		// 		</>
		// 	}
		// </div>

