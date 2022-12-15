import { AddBeerStyleDTO, IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";
import { BeerStyleDBEntity } from "@/infra/entities";

import { DataSource } from "typeorm";

export class BeerStyleRepository implements IBeerStyleRepository {
  private readonly beerstyleRepository;

  constructor(datasource: DataSource) {
    this.beerstyleRepository = datasource.getRepository(BeerStyleDBEntity);
  }

  async add(addBeerStyleDTO: AddBeerStyleDTO): Promise<BeerStyle> {
    const beerstyle = await this.beerstyleRepository.save(addBeerStyleDTO);
    return beerstyle;
  }

  async getAll(): Promise<BeerStyle[]> {
    const beerstyles = await this.beerstyleRepository.find();

    return beerstyles;
  }
}
