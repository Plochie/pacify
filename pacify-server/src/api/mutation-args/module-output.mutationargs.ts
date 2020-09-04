import { Field, InputType } from 'type-graphql';

@InputType()
export class ModuleOutputMutationArgs {
	@Field(type => String)
	sid: string;

	@Field(type => String)
	title: string;
}
