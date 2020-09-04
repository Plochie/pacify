import gql from 'graphql-tag';
import { PacifyModule } from 'src/entities';

export interface Category {
	id: number;
	sid: string;
	title: string;
	desc: string;

	modules: PacifyModule[];
}

// type GQLObjectOptions = {
// 	query: string;
// };
// function GQLObject({ query }: GQLObjectOptions) {
// 	return (ctor: Function) => {
// 		ctor.prototype.__gqlobject__ = { query };
// 	};
// }

// type GQLFieldOptions = {
// 	alias?: string;
// 	order?: number;
// };
// function GQLField({ type }: { type: Function }) {
// 	// return decorator function
// 	return (target: Object, key: string | symbol) => {
// 		if (!target.constructor.prototype.__gqlfield__) {
// 			target.constructor.prototype.__gqlfield__ = [];
// 		}

// 		if (type.prototype.__gqlobject__) {
// 			console.log(type);
// 		}

// 		target.constructor.prototype.__gqlfield__.push({
// 			key,
// 			type,
// 		});
// 	};
// }

// @GQLObject({ query: 'modules' })
// class TestModule {
// 	@GQLField({ type: Number })
// 	id?: number;
// 	@GQLField({ type: String })
// 	sid?: string;
// 	@GQLField({ type: String })
// 	title?: string;
// 	@GQLField({ type: Number })
// 	width?: number;
// 	@GQLField({ type: Number })
// 	height?: number;
// }

// @GQLObject({ query: 'categories' })
// class TestCategory {
// 	@GQLField({ type: Number })
// 	id?: number;
// 	@GQLField({ type: String })
// 	sid?: string;
// 	@GQLField({ type: String })
// 	title?: string;
// 	@GQLField({ type: String })
// 	desc?: string;

// 	@GQLField({ type: TestModule })
// 	modules?: TestModule[];
// }

// function createGQLString(target: Function) {
// 	const gqlObjectOptions: GQLObjectOptions = target.prototype.__gqlobject__;
// 	const gqlFieldOptions: any[] = target.prototype.__gqlfield__;

// 	let query = `query ${gqlObjectOptions.query} {
// ${gqlObjectOptions.query} {
// ${gqlFieldOptions.map(field => field.key).join(' ')}
// }`;

// 	console.log(gqlObjectOptions);
// 	console.log(gqlFieldOptions);
// 	console.log(query);
// }

// createGQLString(TestCategory);

export const GET_CATEGORIES = gql`
	query categories {
		categories {
			id
			sid
			title
			desc
			modules {
				id
				sid
				title
				width
				height
				icon
				isStarter
				isShared
				inputs {
					sid
					title
				}
				outputs {
					sid
					title
				}
			}
		}
	}
`;
