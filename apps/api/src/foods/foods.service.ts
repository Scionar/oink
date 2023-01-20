import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) {}

  findAll(): string[] {
    return [];
  }

  findOne(): string {
    return "";
  }

  async create(name: string, calories: number) {
    const food = await this.prisma.food.create({
      data: {
        name,
        calories,
      },
    });

    console.log("Food created", food);

    return food;
  }
}
