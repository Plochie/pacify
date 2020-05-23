import environment from '@src/config/config';
import PacifyCategory from '@src/entity/category.model';
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
	categorySID: string;

	@Field(type => String)
	sid: string;

	@Field(type => String)
	title: string;

	@Field(type => Number)
	width: number;

	@Field(type => Number)
	height: number;

	@Field(type => String, { nullable: true })
	icon?: string;

	categoryId: number;
}

@Resolver(of => Module)
class ModuleResolver {
	@Query(() => [Module])
	async modules(@Args() args: ModuleQueryArgs) {
		const repo = getRepository(Module, environment.db.name);
		return repo.find(args);
	}

	@Mutation(() => Module)
	async addModule(@Args() args: ModuleMutationArgs) {
		const categoryRepo = getRepository(PacifyCategory, environment.db.name);
		const moduleRepo = getRepository(Module, environment.db.name);

		const category = await categoryRepo.findOne({ sid: args.categorySID });
		console.log(category);

		const module = moduleRepo.create(args);
		if (!category.modules) {
			category.modules = [];
		}
		category.modules.push(module);

		return categoryRepo.save(category);
	}
}

export default ModuleResolver;
