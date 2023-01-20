import { IsDefined, IsInt, IsString } from "class-validator";

export class FoodDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  calories: number;
}
