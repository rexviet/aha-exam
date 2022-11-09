import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IUserActionModel } from './user-action.model';

@Entity('user_actions')
export class UserAction implements IUserActionModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index('idx_user_actions_uid')
  @Column({
    type: 'varchar',
    nullable: false,
  })
  uid!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  method!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  path!: string;

  @Index('idx_user_actions_timestamp')
  @Column({
    type: 'int8',
    nullable: false,
  })
  timestamp!: number;
}
