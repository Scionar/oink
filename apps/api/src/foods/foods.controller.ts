import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { FoodDto } from "./dto";
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
  create(@Body() dto: FoodDto) {
    this.foodService.create(dto.name, dto.calories);
  }

  @Get(":id")
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
