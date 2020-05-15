import ModuleUi from '@src/storage/entity/moduleui.model';
import { GraphQLInt, GraphQLObjectType } from 'graphql';

const ModuleUiGraphQlObject = new GraphQLObjectType<ModuleUi, ModuleUi>({
	name: 'ModuleUi',
	description: 'ModuleUi object from graphql',
	fields: () => {
		return {
			moduleId: {
				type: GraphQLInt,
				resolve(moduleUi) {
					return moduleUi.moduleId;
				},
			},

			name: {
				type: GraphQLInt,
				resolve(moduleUi) {
					return moduleUi.name;
				},
			},

			x: {
				type: GraphQLInt,
				resolve(moduleUi) {
					return moduleUi.x;
				},
			},

			y: {
				type: GraphQLInt,
				resolve(moduleUi) {
					return moduleUi.y;
				},
			},

			width: {
				type: GraphQLInt,
				resolve(moduleUi) {
					return moduleUi.width;
				},
			},

			height: {
				type: GraphQLInt,
				resolve(moduleUi) {
					return moduleUi.height;
				},
			},

			icon: {
				type: GraphQLInt,
				resolve(moduleUi) {
					return moduleUi.icon;
				},
			},

			module: {
				type: GraphQLInt,
				resolve(moduleUi) {
					return moduleUi.module;
				},
			},
		};
	},
});

export default ModuleUiGraphQlObject;
