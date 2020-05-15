import PacifyCategory from '@src/storage/entity/category.model';
import sequelize from '@src/storage/pacify-database';
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import PacifyCategoryGraphQlObject from './category.query';

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	description: 'This is root query',
	fields: () => {
		return {
			categories: {
				type: new GraphQLList(PacifyCategoryGraphQlObject),
				// allows args
				args: {
					id: { type: GraphQLInt },
					sid: { type: GraphQLString },
				},
				resolve(root, args) {
					const repo = sequelize.getRepository(PacifyCategory);
					return repo.findAll({ where: args });
				},
			},
		};
	},
});

export default RootQuery;
