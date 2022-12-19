import { SaveBeerStyleDTO, BeerStyleRepository } from "@/application/interfaces";
import { BeerStyle } from "@/domain/models";
import { BeerStyleDBEntity } from "@/infra/entities";

import { DataSource, DeleteResult, Repository } from "typeorm";

export class PostgresBeerStyleRepository implements BeerStyleRepository {
  private readonly repository: Repository<BeerStyleDBEntity>;

  constructor(datasource: DataSource) {
    this.repository = datasource.getRepository(BeerStyleDBEntity);
  }

  async save(saveBeerStyleDTO: SaveBeerStyleDTO): Promise<BeerStyleDBEntity> {
    const beerstyle = await this.repository.save(saveBeerStyleDTO);
    return beerstyle;
  }

  async findAll(): Promise<BeerStyleDBEntity[]> {
    const beerstyles = await this.repository.find();

    return beerstyles;
  }

  async findOne(id: string): Promise<BeerStyleDBEntity | null> {
    const beerstyle = await this.repository.findOne({
      where: {
        id
      }
    });

    return beerstyle;
  }

  async findByTemperatureAverage(temperature: number): Promise<BeerStyle> {
    const averageQuery =
      "(SUM(\"maxTemperature\") + SUM(\"minTemperature\")) / (COUNT(\"maxTemperature\") + COUNT(\"minTemperature\"))";
    const beerstyle = await this.repository.query(`
    SELECT id, "name", average
    FROM (
      SELECT id, "name", ${averageQuery} as average,
      RANK() OVER (ORDER BY ABS(${temperature} - ${averageQuery}), "name" ASC) as rank
      FROM "beer-style"
      GROUP BY id, "name"
      ) t
      WHERE rank = 1
    `);

    return beerstyle[0];
  }

  async remove(id: string): Promise<DeleteResult> {
    const deleteResult = await this.repository.delete(id);

    return deleteResult;
  }
}
