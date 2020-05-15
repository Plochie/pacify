import PacifyCategory from '@src/storage/entity/category.model';
import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import ModuleGraphQlObject from './module.query';

const PacifyCategoryGraphQlObject: GraphQLObjectType = new GraphQLObjectType<PacifyCategory, PacifyCategory>({
	name: 'Category',
	description: 'Category object from graphql',
	fields: () => {
		return {
			sid: {
				type: GraphQLString,
				resolve(category) {
					return category.sid;
				},
			},
			modules: {
				type: new GraphQLList(ModuleGraphQlObject),
				resolve(category) {
					return category.modules;
				},
			},
		};
	},
});

export default PacifyCategoryGraphQlObject;
