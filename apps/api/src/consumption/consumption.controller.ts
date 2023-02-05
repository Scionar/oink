import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Food } from "@prisma/client";
import { FoodsService } from "../foods/foods.service";
import { ConsumptionService } from "./consumption.service";
import { CreateConsumptionDto } from "./dto";

@Controller("consumption")
export class ConsumptionController {
  constructor(
    private consumptionService: ConsumptionService,
    private foodService: FoodsService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: CreateConsumptionDto) {
    let food: Food;

    try {
      food = await this.foodService.create(dto.foodName, dto.calories);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: "Creating food failed" },
        HttpStatus.BAD_REQUEST
      );
    }

    await this.consumptionService.create(dto.userId, food.id);
  }
}
