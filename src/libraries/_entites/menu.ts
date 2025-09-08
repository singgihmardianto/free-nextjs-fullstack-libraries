import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("menus")
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  path!: string;
}
