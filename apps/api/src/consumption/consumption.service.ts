import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ConsumptionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, foodId: number, date: string) {
    const consumption = await this.prisma.consumption.create({
      data: {
        foodId,
        userId,
        createdAt: date ? new Date(date) : undefined,
      },
    });

    console.log("Consumption created", consumption);

    return consumption;
  }
}
