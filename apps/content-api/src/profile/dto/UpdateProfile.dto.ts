import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  ProfileGender,
  ProfileIdentity,
  ProfileRelationshipStatus,
  ProfileUnit,
} from '../profile.entity';

export class UpdateProfileDto {
  @IsNotEmpty()
  username: string;

  @IsOptional()
  name: string;

  @IsOptional()
  pictureId: string;

  @IsOptional()
  biography: string;

  @IsOptional()
  interestedIn: ProfileGender;

  @IsOptional()
  relationshipStatus: ProfileRelationshipStatus;

  @IsOptional()
  identity: ProfileIdentity[];

  @IsOptional()
  height: number;

  @IsOptional()
  weight: number;

  @IsNotEmpty()
  unit: ProfileUnit;
}
