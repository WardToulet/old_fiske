import { FunctionalComponent } from "preact";
import { useGoogleLogin, } from "react-google-login";

import { authService, handleGoogleLogin } from "../../auth/auth.statemachine";

import GoogleIcon from 'remixicon-react/GoogleLineIcon'
import { GOOGLE_CLIENT_ID } from '../../config';


export const GoogleLogin: FunctionalComponent = () => {
	const { signIn } = useGoogleLogin({
		clientId: GOOGLE_CLIENT_ID,
		onSuccess: ({ tokenId }) =>handleGoogleLogin(tokenId),
	});

	return (
		<button 
				onClick={signIn} 
				class="shadow px-4 py-2 bg-blue-500 text-white rounded flex gap-4 font-semibold"
		>
			<GoogleIcon />
			Login met google
		</button>
	);
}
