import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import PacifyCategory from './category.model';

@Entity({ name: 'module' })
class Module {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, unique: true })
	sid: string;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	width: number;

	@Column({ nullable: false })
	height: number;

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
