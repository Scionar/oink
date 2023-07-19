import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  calories: number;
}
