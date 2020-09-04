import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import PacifyModule from './module.model';

@ObjectType()
@Entity({ name: 'properties' })
class PacifyProperty {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ unique: true, nullable: false })
	sid: string;

	@Field()
	@Column({ nullable: true })
	displayName: string;

	@Field()
	@Column({ nullable: true })
	defaultValue: string;

	@Field()
	@Column({ nullable: false, default: false })
	isExtValueAllowed: boolean;

	@Field()
	@Column({ nullable: false, default: false })
	isExtValueAssigned: boolean;

	@Field()
	@Column({ nullable: true })
	externalValue: string;

	@Field()
	@Column({ nullable: true })
	value: string;

	@Field()
	@Column({ nullable: true })
	regex: string;

	@Field()
	@Column({ nullable: true })
	errorMsg: string;

	@ManyToOne(() => PacifyModule)
	module: PacifyModule;
}

export default PacifyProperty;
