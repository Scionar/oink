import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ConsumptionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, foodId: number) {
    const consumption = await this.prisma.consumption.create({
      data: {
        foodId,
        userId,
      },
    });

    console.log("Consumption created", consumption);

    return consumption;
  }
}
