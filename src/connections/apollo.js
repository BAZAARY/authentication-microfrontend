import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://current--bazaary-supergraph.apollographos.net/graphql", // Reemplaza con la URL de tu API Gateway
	cache: new InMemoryCache(),
});

export default client;
