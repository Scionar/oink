import { IsDefined, IsInt, IsString } from "class-validator";

export class CreateConsumptionDto {
  @IsString()
  @IsDefined()
  foodName: string;

  @IsInt()
  @IsDefined()
  calories: number;

  @IsInt()
  @IsDefined()
  userId: number;
}
