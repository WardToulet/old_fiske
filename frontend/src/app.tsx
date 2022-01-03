// import { LoginPage } from "./pages/login.page";
import { ManageMembers } from "./pages/admin/manage-members.page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export function App() {
	const client = new ApolloClient({
		uri: 'http://localhost:8080/graphql',
		cache: new InMemoryCache()
	})

	return ( 
		<>
			<ApolloProvider client={client}>
				<Router>
					<Routes>
						<Route path="/admin" element={<ManageMembers />} />
					</Routes>
				</Router>
			</ApolloProvider>
		</>
	);
}

// <LandingPage />
			// <GoogleLogin
			// 	clientId="645878306965-bichhk3mieo32n6t0tluv6ov6tv5pq87.apps.googleusercontent.com"
			// 	onSuccess={x => console.log(x)}
			// 	onFailure={console.error}
			// />
