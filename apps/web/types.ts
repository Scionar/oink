import { RecursivelyConvertDatesToStrings } from './helpers/RecursivelyConvertDatesToStrings';

type Consumption = {
  id: number;
  createdAt: Date;
  food: Food;
  userId: number;
};

type Food = {
  id: number;
  createdAt: Date;
  name: string;
  calories: number;
  consumption: Consumption[];
  userId: number;
};

interface ConsumptionType
  extends RecursivelyConvertDatesToStrings<Consumption> {
  food: RecursivelyConvertDatesToStrings<Food>;
}

export interface ConsumptionsResponseType extends Array<ConsumptionType> {}

export type FoodType = RecursivelyConvertDatesToStrings<Food>;

export interface FoodsResponseType extends Array<FoodType> {}
