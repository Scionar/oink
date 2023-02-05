import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { FoodsService } from "./foods.service";

@Module({
  imports: [PrismaModule],
  providers: [FoodsService],
  exports: [FoodsService],
})
export class FoodsModule {}
