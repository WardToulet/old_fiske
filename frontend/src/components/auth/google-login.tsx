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
				class="shadow p-2 bg-blue-500 text-white rounded flex gap-2 font-semibold text-sm"
		>
			<GoogleIcon size={20}/>
			Login met google
		</button>
	);
}
