import { Injectable } from '@nestjs/common';
import { Food } from './food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
  ) {}

  async findAll() {
    return await this.foodsRepository.find({
      relations: {
        consumption: true,
      },
    });
  }

  async findMatch(name: string, calories: number): Promise<Food> {
    return await this.foodsRepository.findOne({
      relations: {
        consumption: true,
      },
      where: {
        name,
        calories,
      },
    });
  }

  async create(name: string, calories: number): Promise<Food> {
    const createdFood = await this.foodsRepository.save({
      name,
      calories,
      userId: 1,
    });

    return await this.foodsRepository.findOne({
      relations: {
        consumption: true,
      },
      where: {
        id: createdFood.id,
      },
    });
  }

  async delete(id: number) {
    await this.foodsRepository.delete({ id });
  }
}
