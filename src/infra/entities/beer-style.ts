/* eslint-disable indent */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "beer-style" })
export class BeerStyleDBEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  minTemperature!: number;

  @Column()
  maxTemperature!: number;
}
