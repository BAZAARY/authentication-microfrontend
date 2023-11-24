import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, LOGIN_GOOGLE_USER } from "../connections/queries";

const Login = () => {
	const [loginUser] = useMutation(LOGIN_USER);
	// const [loginGoogleUser] = useMutation(LOGIN_GOOGLE_USER);
	const navigate = useNavigate(); // Hook de navegación
	// const [showAlert, setShowAlert] = useState(false); // Estado para mostrar/ocultar la alerta

	const [formData, setFormData] = useState({
		email: "",
		contrasena: "",
	}); // Estado para almacenar los datos del formulario de inicio de sesión

	//MANEJAR EL LOGIN NORMAL (SIN GOOGLE)
	const handleSubmit = (event) => {
		localStorage.clear();
		window.localStorage.clear();
		event.preventDefault(); // Prevenir comportamiento de envío predeterminado
		const lowercaseEmail = formData.email.toLowerCase(); // Convertir el campo de email a minúsculas

		const myresponse = async () => {
			// Realizar solicitud de inicio de sesión utilizando los datos del formulario
			// const req_succesful = await postLogin({
			// 	...formData,
			// 	email: lowercaseEmail,
			// });
			try {
				const response = await loginUser({
					variables: {
						input: {
							email: lowercaseEmail,
							contrasena: formData.contrasena,
						},
					},
				});

				localStorage.setItem("token", response["data"]["loginUser"].token);
				// Si las credenciales son correctas, mostrar una alerta de éxito y navegar a la página de inicio ("/home")
				Swal.fire({
					title: "Bienvenido a Bazaary",
					text: "",
					icon: "success",
					customClass: {
						container: "font-text",
					},
				});

				navigate("/home");
			} catch (error) {
				console.error("Error:", error);
				// Si las credenciales son incorrectas, mostrar una alerta de error con el mensaje de error devuelto por la solicitud
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Credenciales inválidas",
					customClass: {
						container: "font-text",
					},
				});
			}
		};
		myresponse(); // Ejecutar la función asíncrona myresponse
	};

	//MANEJAR EL LOGIN CON GOOGLE
	// const handleGoogleLogin = (credentialResponse) => {
	// 	localStorage.clear();
	// 	window.localStorage.clear();
	// 	const myresponse = async () => {
	// 		// Realizar solicitud de inicio de sesión utilizando los datos del formulario
	// 		const req_succesful = await loginGoogleUser({
	// 			variables: {
	// 				input: {
	// 					clientId: credentialResponse.clientId,
	// 					credential: credentialResponse.credential,
	// 				},
	// 			},
	// 		});
	// 		localStorage.setItem("token", req_succesful["data"]["loginUser"].token);
	// 		if (req_succesful.data.loginGoogleUser.message === "Inicio de sesión (Google) exitoso") {
	// 			// Si las credenciales son correctas, mostrar una alerta de éxito y navegar a la página de inicio ("/home")
	// 			Swal.fire({
	// 				title: "Welcome!",
	// 				text: "You have succesfully been logged!",
	// 				icon: "success",
	// 				customClass: {
	// 					container: "font-text",
	// 				},
	// 			});

	// 			navigate("/home");
	// 		}
	// 	};
	// 	myresponse(); // Ejecutar la función asíncrona myresponse
	// };

	// Render de la pagina con sus componentes. Una imagen de fondo, un logo, y los campos necesarios para loguearse. Además del botón de submit y el botón que lleva a registro
	return (
		<div id="login" className="font-text">
			{/* {showAlert && <Alert />} */}

			<div className="md:flex md:flex-row w-full">
				{/* PARTE DERECHA */}
				<form onSubmit={handleSubmit} className="flex w-full justify-center items-center">
					<div className="flex p-4 flex-col justify-center h-full w-full md:bg-[#ffdcb7] max-w-md md:border-2 md:border-gray-100 rounded-3xl mt-8 md:mt-16">
						{/* CAMPO DE EMAIL, PASSWORD, BOTON DE LOGIN */}
						<div className="flex flex-col items-center justify-center">
							<p className="font-bold text-3xl py-8">Iniciar sesión</p>
							<p className="pb-8 text-center">Bienvenido a Bazaary - Tu Mercado en Línea</p>

							{/* CAMPO DE EMAIL, PASSWORD, BOTON DE LOGIN */}
							<div className="flex flex-col items-center justify-center w-full">
								<input
									id="email"
									type="text"
									className="max-w-sm w-full h-full text-center border-2 rounded-xl focus:outline-none mb-4 focus:border-custom-rojo focus:ring-0"
									placeholder="E-mail"
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								/>
								<input
									id="password"
									type="password"
									className="max-w-sm w-full h-full text-center border-2 rounded-xl focus:outline-none mb-4 focus:border-custom-rojo focus:ring-0"
									placeholder="Contraseña"
									onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
								/>

								<button
									id="submit"
									type="submit"
									className="max-w-sm bg-orange-400 text-white w-full h-full text-center border-2 rounded-xl md:border-0 focus:outline-none py-2 mb-4"
									onSubmit={(e) => e.preventDefault()}
								>
									Ingresar
								</button>
							</div>

							{/* ELEMENTOS DE LOGIN CON GOOGLE, RECUPERAR CONTRASENA Y REGISTRARSE */}
							<div className="flex flex-col items-center">
								<p className="pt-6 pb-4 font-bold">O continúa con Google:</p>

								{/* LOGIN CON GOOGLE */}
								{/* <div className="mb-8">
									<GoogleOAuthProvider clientId="176512858558-8jjm4bclhonv3vbi2dlg22djslfm7iti.apps.googleusercontent.com">
										<GoogleLogin
											onSuccess={(credentialResponse) => {
												handleGoogleLogin(credentialResponse); // Pasar credentialResponse como argumento
											}}
											onError={() => {
												console.log("Login Failed");
											}}
											theme="filled_blue"
											shape="circle"
											useOneTap
										/>
									</GoogleOAuthProvider>
								</div> */}

								<button className="pb-4" onClick={() => navigate("/register")}>
									No tengo una cuenta en Bazaary
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
