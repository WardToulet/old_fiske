import { Routes, BrowserRouter, Route } from "react-router-dom";
import { AuthPage } from './pages/auth/auth.page';


export function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>



					<Route path="*" element={<AuthPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
