import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FoodsService } from '../foods/foods.service';
import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto, DeleteConsumptionDto } from './dto';
import { Food } from '../foods/food.entity';

@Controller('consumption')
export class ConsumptionController {
  @Inject(FoodsService)
  private readonly foodService: FoodsService;

  @Inject(ConsumptionService)
  private readonly consumptionService: ConsumptionService;

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.consumptionService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: CreateConsumptionDto) {
    let food: Food;

    food = await this.foodService.findMatch(dto.foodName, dto.calories);

    if (!food) {
      try {
        food = await this.foodService.create(dto.foodName, dto.calories);
      } catch (error) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: 'Creating food failed' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.consumptionService.create(dto.userId, food, dto.date);
  }

  @Delete()
  @UsePipes(new ValidationPipe({ transform: true }))
  async delete(@Body() dto: DeleteConsumptionDto) {
    const consumption = await this.consumptionService.delete(dto.id);

    const foodId = consumption.food.id;

    const haveSameFood = await this.consumptionService.findAllWithRelatedFood(
      foodId,
    );

    // Other consumptions related to linked
    // Food does not exist. We delete it.
    if (!haveSameFood.length) {
      await this.foodService.delete(foodId);
    }

    return consumption;
  }
}
