import { FunctionalComponent } from "preact";
import { GoogleLogin } from "../../components/auth/google-login";
import { Link } from 'react-router-dom';

export const LoginPartial: FunctionalComponent = () => {
	return (
		<article className="grid gap-4">
			<section className="grid gap-4">
				<h1 className="text-xl font-semibold">Login</h1>
				<div className="grid gap-1">
					<GoogleLogin />
				</div>
			</section>

			<hr />

			<section className="grid gap-1 text-center">
				<h1 className="text-xs text-gray-600">Geen Account?</h1>
				<Link className="text-sm text-blue-600 hover:text-blue-900" to="/register">Maak een account</Link>
			</section>
		</article>
	);
}
