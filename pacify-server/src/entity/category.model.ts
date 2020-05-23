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
	title: string;

	@Field()
	@Column({ nullable: true })
	desc?: string;

	@OneToMany(type => Module, module => module.category, {
		cascade: true,
	})
	@Field(type => [Module])
	modules: Module[];

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;
}

export default PacifyCategory;
