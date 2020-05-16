import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Module from './module.model';

@ObjectType()
@Entity({ name: 'category' })
class PacifyCategory {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ unique: true, nullable: false })
	sid: string;

	@Field()
	@Column({ nullable: false })
	name: string;

	@Field()
	@Column({ nullable: true })
	desc?: string;

	// @Field(type => Module)
	@OneToMany(type => Module, module => module.category, {
		cascade: true,
	})
	modules: Module[];

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;
}

export default PacifyCategory;
