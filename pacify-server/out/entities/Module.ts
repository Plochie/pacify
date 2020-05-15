import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";

@Index("IDX_d8b106efdbe4c95e54b96bc080", ["sid"], { unique: true })
@Entity("module", { schema: "pacify" })
export class Module {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "sid", unique: true, length: 255 })
  sid: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "width" })
  width: number;

  @Column("int", { name: "height" })
  height: number;

  @Column("varchar", { name: "icon", nullable: true, length: 255 })
  icon: string | null;

  @ManyToOne(() => Category, (category) => category.modules, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;
}
