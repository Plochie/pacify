import gql from 'graphql-tag';

export interface Category {
	id: number;
	sid: string;
	name: string;
	desc: string;
}

export const GET_CATEGORIES = gql`
	{
		categories {
			id
			sid
			name
			desc
		}
	}
`;
