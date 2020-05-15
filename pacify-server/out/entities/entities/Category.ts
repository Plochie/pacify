import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Module } from "./Module";

@Index("IDX_b0a08a8fa9e2c36ab674c31f4e", ["sid"], { unique: true })
@Entity("category", { schema: "pacify" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "sid", unique: true, length: 255 })
  sid: string;

  @OneToMany(() => Module, (module) => module.category)
  modules: Module[];
}
