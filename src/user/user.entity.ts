import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  SUPER_ADMIN = 'super_admin',
  BRANCH_ADMIN = 'branch_admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  ACCOUNTANT = 'accountant',
  PARENT = 'parent',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.STUDENT],
  })
  roles: Role[];
}
