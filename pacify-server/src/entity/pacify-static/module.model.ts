import { Field, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import PacifyCategory from './category.model';
import ModuleInput from './module-input.model';
import ModuleOutput from './module-output.model';
import PacifyProperty from './properties.model';

@ObjectType()
@Entity({ name: 'module' })
class PacifyModule {
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

	@Field(type => Boolean)
	@Column({ nullable: false, default: false, type: 'boolean' })
	isStarter: boolean;

	@Field(type => Boolean)
	@Column({ nullable: false, default: false, type: 'boolean' })
	isShared: boolean;

	@Field({ nullable: true })
	@Column({ nullable: true })
	icon?: string;

	@OneToMany(type => ModuleInput, input => input.module, {
		cascade: true,
	})
	@Field(type => [ModuleInput])
	inputs: ModuleInput[];

	@OneToMany(type => ModuleOutput, output => output.module, {
		cascade: true,
	})
	@Field(type => [ModuleOutput])
	outputs: ModuleOutput[];

	@OneToMany(type => PacifyProperty, properties => properties.module, {
		cascade: true,
	})
	@Field(type => [PacifyProperty])
	properties: PacifyProperty[];

	@ManyToOne(() => PacifyCategory)
	category: PacifyCategory;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

export default PacifyModule;
