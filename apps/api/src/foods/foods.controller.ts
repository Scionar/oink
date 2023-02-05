import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateFoodDto } from "./dto";
import { FoodsService } from "./foods.service";

@Controller("foods")
export class FoodsController {
  constructor(private foodService: FoodsService) {}

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: CreateFoodDto) {
    await this.foodService.create(dto.name, dto.calories);
  }

  @Get(":id")
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
