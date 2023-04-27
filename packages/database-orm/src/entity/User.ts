import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  firstName: string;

  @Column("text")
  lastName: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column("timestamp without time zone")
  birthday: Date;

  @Column("timestamptz")
  lockedUntil: Date;

  @CreateDateColumn()
  created: Date;

  @Column("text")
  password: string;

  @Column("text")
  salt: string;

  @Column("timestamptz")
  passwordUpdated: Date;
}
