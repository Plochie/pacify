import { buildSchema } from 'type-graphql';

// const SchemaGraphQl = new GraphQLSchema({ query: RootQuery });

const SchemaGraphQl = buildSchema({
	resolvers: [__dirname + '/resolvers/**/*.resolver.{ts,js}'],
});

export default SchemaGraphQl;
