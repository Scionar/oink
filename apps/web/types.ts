import { Consumption, Food } from 'database';
import { RecursivelyConvertDatesToStrings } from './helpers/RecursivelyConvertDatesToStrings';

interface ConsumptionType
  extends RecursivelyConvertDatesToStrings<Consumption> {
  food: RecursivelyConvertDatesToStrings<Food>;
}

export interface ConsumptionsResponseType extends Array<ConsumptionType> {}

type FoodType = RecursivelyConvertDatesToStrings<Food>;

export interface FoodsResponseType extends Array<FoodType> {}
