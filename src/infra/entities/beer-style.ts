import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "BeerStyle" })
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
