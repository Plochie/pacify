import { Field, InputType, Int } from 'type-graphql';
import { ModuleInputMutationArgs } from './module-input.mutationargs';
import { ModuleOutputMutationArgs } from './module-output.mutationargs';

@InputType()
export class ModuleMutationArgs {
	@Field(type => String)
	categorySID: string;

	@Field(type => String)
	sid: string;

	@Field(type => String)
	title: string;

	@Field(type => Int)
	width: number;

	@Field(type => Int)
	height: number;

	@Field(type => Boolean)
	isStarter: boolean;

	@Field(type => Boolean)
	isShared: boolean;

	@Field(type => String, { nullable: true })
	icon?: string;

	@Field(type => [ModuleInputMutationArgs])
	inputs: ModuleInputMutationArgs[];

	@Field(type => [ModuleOutputMutationArgs])
	outputs: ModuleOutputMutationArgs[];
}
