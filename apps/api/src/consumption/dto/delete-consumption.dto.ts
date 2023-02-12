import { IsDefined, IsInt } from "class-validator";

export class DeleteConsumptionDto {
  @IsInt()
  @IsDefined()
  id: number;
}
