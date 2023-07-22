import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumption } from './consumption.entity';
import { Repository } from 'typeorm';
import { Food } from '../foods/food.entity';

@Injectable()
export class ConsumptionService {
  constructor(
    @InjectRepository(Consumption)
    private consumptionRepository: Repository<Consumption>,
  ) {}

  async findAll() {
    return await this.consumptionRepository.find({
      relations: {
        food: true,
      },
      loadRelationIds: true,
      select: {
        id: true,
        createdAt: true,
        food: {
          id: true,
          name: true,
          calories: true,
        },
      },
    });
  }

  async findAllWithRelatedFood(foodId: number) {
    return await this.consumptionRepository.find({
      relations: {
        food: true,
      },
      where: {
        food: {
          id: foodId,
        },
      },
    });
  }

  async create(userId: number, food: Partial<Food>, date: string) {
    return await this.consumptionRepository.save({
      food: food,
      userId,
      createdAt: date ? new Date(date) : undefined,
    });
  }

  async delete(id: number): Promise<Consumption> {
    const consumption = await this.consumptionRepository.findOne({
      where: {
        id,
      },
    });

    await this.consumptionRepository.delete({ id });

    return consumption;
  }
}
