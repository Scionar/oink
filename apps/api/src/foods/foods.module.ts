import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { Food } from './food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodsController } from './foods.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodsService],
  controllers: [FoodsController],
  exports: [FoodsService],
})
export class FoodsModule {}
