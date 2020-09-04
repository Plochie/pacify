import { Field, InputType } from 'type-graphql';

@InputType()
export class CategoryMutationArgs {
	@Field(type => String)
	title: string;

	@Field(type => String)
	sid: string;

	@Field(type => String, { nullable: true })
	desc?: string;
}
