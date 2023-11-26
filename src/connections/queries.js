import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
	mutation RegisterUser($input: UserInput!) {
		registerUser(input: $input) {
			message
		}
	}
`;

export const LOGIN_USER = gql`
	mutation LoginUser($input: UserInput!) {
		loginUser(input: $input) {
			user {
				id_usuario
				email
				nombre_usuario
			}
			token
			message
		}
	}
`;
