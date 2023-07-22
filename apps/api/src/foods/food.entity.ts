import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Consumption } from '../consumption/consumption.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text')
  name: string;

  @Column()
  calories: number;

  @OneToMany(() => Consumption, (consumption) => consumption.food)
  consumption: Consumption[];

  @Column()
  userId: number;
}
