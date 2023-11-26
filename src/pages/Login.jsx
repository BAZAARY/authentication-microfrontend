import "../index.css"; // Otros estilos de la aplicación
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../connections/queries";
import { tw } from "twind";

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

	// Render de la pagina con sus componentes. Una imagen de fondo, un logo, y los campos necesarios para loguearse. Además del botón de submit y el botón que lleva a registro
	return (
		<div id="login" className={tw`font-text`}>
			{/* {showAlert && <Alert />} */}

			<div className={tw`md:flex md:flex-row w-full`}>
				{/* PARTE DERECHA */}
				<form onSubmit={handleSubmit} className={tw`flex w-full justify-center items-center`}>
					<div
						className={tw`flex p-4 flex-col justify-center h-full w-full md:bg-[#ffdcb7] max-w-md md:border-2 md:border-gray-100 rounded-3xl mt-8 md:mt-16`}
					>
						{/* CAMPO DE EMAIL, PASSWORD, BOTON DE LOGIN */}
						<div className={tw`flex flex-col items-center justify-center`}>
							<p className={tw`font-bold text-3xl py-8`}>Iniciar sesión</p>
							<p className={tw`pb-8 text-center`}>Bienvenido a Bazaary - Tu Mercado en Línea</p>

							{/* CAMPO DE EMAIL, PASSWORD, BOTON DE LOGIN */}
							<div className={tw`flex flex-col items-center justify-center w-full`}>
								<input
									id="email"
									type="text"
									className={tw`max-w-sm w-full py-1 text-center border-2 rounded-xl focus:outline-none mb-4 focus:border-custom-rojo focus:ring-0`}
									placeholder="E-mail"
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								/>
								<input
									id="password"
									type="password"
									className={tw`max-w-sm w-full py-1 text-center border-2 rounded-xl focus:outline-none mb-4 focus:border-custom-rojo focus:ring-0`}
									placeholder="Contraseña"
									onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
								/>

								<button
									id="submit"
									type="submit"
									className={tw`max-w-sm py-1 bg-custom-orange text-white w-full h-full text-center border-2 rounded-xl md:border-0 focus:outline-none py-2 mb-12`}
									onSubmit={(e) => e.preventDefault()}
								>
									Ingresar
								</button>
							</div>

							{/* ELEMENTOS DE LOGIN CON GOOGLE, RECUPERAR CONTRASENA Y REGISTRARSE */}
							<div className={tw`flex flex-col items-center`}>
								<button className={tw`pb-4`} onClick={() => navigate("/register")}>
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
