import { CategoryMutationArgs } from '@src/api/mutation-args';
import environment from '@src/config/config';
import PacifyCategory from '@src/entity/pacify-static/category.model';
import { Arg, Args, ArgsType, Field, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

@ArgsType()
class CategoryQueryArgs {
	@Field(type => String, { nullable: true })
	sid: string;
}

@Resolver(of => PacifyCategory)
class PacifyCategoryResolver {
	// Pacify category resolver
	@Query(() => [PacifyCategory])
	async categories(@Args() args: CategoryQueryArgs): Promise<PacifyCategory[]> {
		const repo = getRepository(PacifyCategory, environment.db.static.name);
		const categs = await repo.find({
			relations: ['modules', 'modules.inputs', 'modules.outputs'],
			where: args,
		});

		return categs;
	}

	@Mutation(() => PacifyCategory)
	addCategory(@Arg('category') args: CategoryMutationArgs) {
		const repo = getRepository(PacifyCategory, environment.db.static.name);
		return repo.save(args);
	}
}

export default PacifyCategoryResolver;
