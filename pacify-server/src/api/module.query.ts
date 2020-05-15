import Module from '@src/storage/entity/module.model';
import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import PacifyCategoryGraphQlObject from './category.query';
import ModuleUiGraphQlObject from './moduleui.query';

const ModuleGraphQlObject = new GraphQLObjectType<Module, Module>({
	name: 'Module',
	description: 'Module object from graphql',
	fields: () => {
		return {
			categoryId: {
				type: GraphQLInt,
				resolve(module) {
					return module.categoryId;
				},
			},

			sid: {
				type: GraphQLString,
				resolve(module) {
					return module.sid;
				},
			},

			ui: {
				type: ModuleUiGraphQlObject,
				resolve(module) {
					return module.ui;
				},
			},

			category: {
				type: PacifyCategoryGraphQlObject,
				resolve(module) {
					return module.category;
				},
			},
		};
	},
});

export default ModuleGraphQlObject;
