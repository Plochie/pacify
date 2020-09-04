import { ModuleMutationArgs } from '@src/api/mutation-args';
import environment from '@src/config/config';
import PacifyCategory from '@src/entity/pacify-static/category.model';
import PacifyModule from '@src/entity/pacify-static/module.model';
import { Arg, Args, ArgsType, Field, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

@ArgsType()
class ModuleQueryArgs {
	@Field(type => String, { nullable: true })
	sid: string;
}

@Resolver(of => PacifyModule)
class ModuleResolver {
	// module resolver
	@Query(() => [PacifyModule])
	async modules(@Args() args: ModuleQueryArgs) {
		// get all modules with where
		const repo = getRepository(PacifyModule, environment.db.static.name);
		return repo.find({
			where: args,
			relations: ['inputs', 'outputs', 'properties'],
		});
	}

	@Mutation(() => PacifyModule)
	async addModule(@Arg('module') args: ModuleMutationArgs) {
		// add module
		const categoryRepo = getRepository(PacifyCategory, environment.db.static.name);
		const moduleRepo = getRepository(PacifyModule, environment.db.static.name);

		const category = await categoryRepo.findOne({
			where: { sid: args.categorySID },
			relations: ['modules'],
		});

		if (!category.modules) {
			category.modules = [];
		}

		const module = moduleRepo.create(args);
		category.modules.push(module);

		return categoryRepo.save(category);
	}
}

export default ModuleResolver;
