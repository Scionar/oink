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
  account: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "timestamptz", nullable: true })
  emailVerified: Date;

  @Column("timestamp without time zone")
  birthday: Date;

  @Column("timestamptz", { nullable: true })
  lockedUntil: Date;

  @CreateDateColumn()
  created: Date;

  @Column("text")
  password: string;

  @Column("text")
  salt: string;

  @Column("timestamptz", { nullable: true })
  passwordUpdated: Date;
}
