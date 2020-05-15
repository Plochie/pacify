import environment from '@src/config/config';
import PacifyCategory from '@src/entity/category.model';
import { Args, ArgsType, Field, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

@ArgsType()
class CategoryQueryArgs {
	@Field(type => String, { nullable: true })
	sid: string;
}

@ArgsType()
class CategoryMutationArgs {
	@Field(type => String)
	name: string;

	@Field(type => String, { nullable: true })
	desc?: string;
}

@Resolver(of => PacifyCategory)
class PacifyCategoryResolver {
	@Query(() => [PacifyCategory])
	async categories(@Args() args: CategoryQueryArgs) {
		const repo = getRepository(PacifyCategory, environment.db.name);
		return repo.find();
	}

	@Mutation(() => PacifyCategory)
	addCategory(@Args() args: CategoryMutationArgs) {
		console.log(args);
		const repo = getRepository(PacifyCategory, environment.db.name);
		return repo.save(args);
	}
}

export default PacifyCategoryResolver;
