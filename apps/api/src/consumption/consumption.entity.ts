import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Food } from '../foods/food.entity';

@Entity()
export class Consumption {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Food, (food) => food.consumption)
  food: Food;

  @Column()
  userId: number;
}
