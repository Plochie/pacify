import { buildSchema } from 'type-graphql';
import PacifyCategoryResolver from './resolver/category.resolver';

// const SchemaGraphQl = new GraphQLSchema({ query: RootQuery });

const SchemaGraphQl = buildSchema({
	resolvers: [PacifyCategoryResolver],
});

export default SchemaGraphQl;
