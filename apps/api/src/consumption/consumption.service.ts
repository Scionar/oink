import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ConsumptionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.consumption.findMany({
      include: {
        food: true,
      },
    });
  }

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

  async delete(id: number) {
    const consumption = await this.prisma.consumption.delete({
      where: {
        id,
      },
    });

    console.log("Consumption delete", consumption);

    return consumption;
  }
}
