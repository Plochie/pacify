import environment from '@src/config/config';
import Module from '@src/entity/module.model';
import { Args, ArgsType, Field, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

@ArgsType()
class ModuleQueryArgs {
	@Field(type => String, { nullable: true })
	sid: string;
}

@ArgsType()
class ModuleMutationArgs {
	@Field(type => String)
	sid: string;

	@Field(type => String)
	name: string;

	@Field(type => Number)
	width: number;

	@Field(type => Number)
	height: number;

	@Field(type => String, { nullable: true })
	icon?: string;
}

@Resolver(of => Module)
class ModuleResolver {
	@Query(() => [Module])
	async modules(@Args() args: ModuleQueryArgs) {
		const repo = getRepository(Module, environment.db.name);
		return repo.find(args);
	}

	@Mutation(() => Module)
	addModule(@Args() args: ModuleMutationArgs) {
		const repo = getRepository(Module, environment.db.name);
		return repo.save(args);
	}
}

export default ModuleResolver;
