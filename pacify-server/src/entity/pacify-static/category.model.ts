import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import PacifyModule from './module.model';

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

	@Field({ nullable: true })
	@Column({ nullable: true })
	desc?: string;

	@OneToMany(type => PacifyModule, module => module.category, {
		cascade: true,
	})
	@Field(type => [PacifyModule])
	modules: PacifyModule[];

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;
}

export default PacifyCategory;
