import { FunctionalComponent } from "preact";
import GoogleLogin from "react-google-login";

export const LandingPage: FunctionalComponent = () => {
	return (
		<div class="p-8">
			<div class="rounded shadow grid md:grid-cols-2">
				<div class="grid gap-4 grow p-4 bg-white">
					<section class="">
						<h1 class="font-bold text-lg">Inloggen</h1>
					</section>

					<section class="grid gap-4">
						<h1 class="font-bold text-lg">Registeeren</h1>

						<div class="border border-blue-500 flex rounded shadow">
							<input type="text" placeholder="registratiecode" class="p-2" />
							<button class="grow bg-blue-500 p-2 text-white ">Registreeren</button>
						</div>
					</section>
				</div>

				<div class="hidden md:grid grow p-4 bg-white bg-gradient-to-r from-cyan-500 to-blue-500">
					<span class="place-self-center text-white font-bold text-2xl">Fiske</span>
				</div>
			</div>
		</div>
	);
}
