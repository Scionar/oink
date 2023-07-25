import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

export enum ProfileGender {
  MALE = 'male',
  TRANSGENDER = 'transgender',
  TRANSWOMAN = 'transwoman',
  TRANSMAN = 'transman',
  NONBINARY = 'nonbinary',
  OTHER = 'other',
}

export enum ProfileRelationshipStatus {
  SINGLE = 'single',
  DATING = 'dating',
  IN_A_RELATIONSHIP = 'in_a_relationship',
  OPEN_RELATIONSHIP = 'open_relationship',
  POLYAMOROUS = 'polyamorous',
  OPEN_POLYAMOROUS = 'open_polyamorous',
  ENGAGED = 'engaged',
  MARRIED = 'married',
  WIDOEWED = 'widowed',
  COMPLICATED = 'complicated',
}

export enum ProfileIdentity {
  GAINER = 'gainer',
  ENCOURAGER = 'encourager',
  BLOATER = 'bloater',
  MAINTAINER = 'maintainer',
  MUSCLE_GAINER = 'muscle_gainer',
}

export enum ProfileUnit {
  METRIC = 'metric',
  IMPREIAL = 'imperial',
}

@Entity()
export class Profile {
  @PrimaryColumn({ unique: true })
  uuid: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  pictureId: string;

  @Column()
  biography: string;

  @Column({
    type: 'enum',
    enum: ProfileGender,
    default: ProfileGender.MALE,
  })
  role: ProfileGender;

  @Column({
    type: 'enum',
    enum: ProfileGender,
    default: ProfileGender.MALE,
  })
  interestedIn: ProfileGender;

  @Column({
    type: 'enum',
    enum: ProfileRelationshipStatus,
    default: ProfileRelationshipStatus.SINGLE,
  })
  relationshipStatus: ProfileRelationshipStatus;

  @Column({
    type: 'enum',
    enum: ProfileIdentity,
    default: [],
    array: true,
  })
  identity: ProfileIdentity[];

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column({
    type: 'enum',
    enum: ProfileUnit,
    default: ProfileUnit.METRIC,
  })
  unit: ProfileUnit;
}
