import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import PacifyCategory from './category.model';

@ObjectType()
@Entity({ name: 'module' })
class Module {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ nullable: false, unique: true })
	sid: string;

	@Field()
	@Column({ nullable: false })
	title: string;

	@Field()
	@Column({ nullable: false })
	width: number;

	@Field()
	@Column({ nullable: false })
	height: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	icon?: string;

	@ManyToOne(() => PacifyCategory)
	category: PacifyCategory;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

export default Module;
