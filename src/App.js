import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import client from "./connections/apollo";

const App = () => {
	return (
		<BrowserRouter>
			<ApolloProvider client={client}>
				<ToastContainer
					position="bottom-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
					bodyClassName={"toastBody"}
				/>

				{/* <GoogleOAuthProvider clientId="176512858558-8jjm4bclhonv3vbi2dlg22djslfm7iti.apps.googleusercontent.com"> */}
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
				{/* </GoogleOAuthProvider> */}
			</ApolloProvider>
		</BrowserRouter>
	);
};

export default App;
