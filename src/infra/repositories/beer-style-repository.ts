import { SaveBeerStyleDTO, IBeerStyleRepository } from "@/domain/interfaces";
import { BeerStyle } from "@/domain/models";
import { BeerStyleDBEntity } from "@/infra/entities";

import { DataSource } from "typeorm";

export class BeerStyleRepository implements IBeerStyleRepository {
  private readonly beerstyleRepository;

  constructor(datasource: DataSource) {
    this.beerstyleRepository = datasource.getRepository(BeerStyleDBEntity);
  }

  async save(saveBeerStyleDTO: SaveBeerStyleDTO): Promise<BeerStyle> {
    const beerstyle = await this.beerstyleRepository.save(saveBeerStyleDTO);
    return beerstyle;
  }

  async findAll(): Promise<BeerStyle[]> {
    const beerstyles = await this.beerstyleRepository.find();

    return beerstyles;
  }

  async findOne(id: string): Promise<BeerStyle | null> {
    const beerstyle = await this.beerstyleRepository.findOne({
      where: {
        id
      }
    });

    return beerstyle;
  }
}
