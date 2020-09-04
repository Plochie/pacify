import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import PacifyModule from './module.model';

@ObjectType()
@Entity({ name: 'module_output' })
class ModuleOutput {
	@Field(type => Number)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(type => String)
	@Column({ nullable: false, unique: true })
	sid: string;

	@Field(type => String)
	@Column({ nullable: false })
	title: string;

	@ManyToOne(() => PacifyModule)
	module: PacifyModule;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

export default ModuleOutput;
