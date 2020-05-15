import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
});

export default apolloClient;
