import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import PacifyModule from './module.model';

@ObjectType()
@Entity({ name: 'module_input' })
class ModuleInput {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ nullable: false, unique: true })
	sid: string;

	@Field()
	@Column({ nullable: false })
	title: string;

	@ManyToOne(() => PacifyModule)
	module: PacifyModule;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

export default ModuleInput;
