import { Module } from "@nestjs/common";
import { ConsumptionModule } from "../consumption/consumption.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule, ConsumptionModule],
})
export class FoodsModule {}
