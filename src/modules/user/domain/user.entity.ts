import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IUserModel } from './user.model';

@Entity('users')
export class User implements IUserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx_user_uid', { unique: true })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  uid: string;

  @Index('idx_user_email')
  @Column({
    type: 'varchar',
    nullable: true,
  })
  email?: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  emailVerified: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  displayName?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  photoURL?: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at?: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;
}
