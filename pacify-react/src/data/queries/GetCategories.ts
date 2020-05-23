import gql from 'graphql-tag';
import { PacifyModule } from 'src/entities';

export interface Category {
	id: number;
	sid: string;
	title: string;
	desc: string;

	modules: PacifyModule[];
}

type GQLObjectOptions = {
	query: string;
};
function GQLObject({ query }: GQLObjectOptions) {
	return (ctor: Function) => {
		ctor.prototype.__gqlobject__ = { query };
	};
}

type GQLFieldOptions = {
	alias?: string;
	order?: number;
};
function GQLField(options?: GQLFieldOptions) {
	// return decorator function
	return (target: Object, key: string | symbol) => {
		if (!target.constructor.prototype.__gqlfield__) {
			target.constructor.prototype.__gqlfield__ = [];
		}

		target.constructor.prototype.__gqlfield__.push({
			key,
		});
	};
}

@GQLObject({ query: 'categories' })
class TestCategory {
	@GQLField()
	id?: number;
	@GQLField()
	sid?: string;
	@GQLField()
	title?: string;
	@GQLField()
	desc?: string;

	@GQLField(type => [TestModule])
	modules?: TestModule[];
}

@GQLObject({ query: 'modules' })
class TestModule {
	@GQLField()
	id?: number;
	@GQLField()
	sid?: string;
	@GQLField()
	title?: string;
	@GQLField()
	width?: number;
	@GQLField()
	height?: number;
}

function createGQLString(target: Function) {
	const gqlObjectOptions: GQLObjectOptions = target.prototype.__gqlobject__;
	const gqlFieldOptions: any[] = target.prototype.__gqlfield__;

	let query = `query ${gqlObjectOptions.query} {
${gqlObjectOptions.query} {
${gqlFieldOptions.map(field => field.key).join(' ')}
}`;

	console.log(query);
}

createGQLString(TestCategory);

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
			}
		}
	}
`;
