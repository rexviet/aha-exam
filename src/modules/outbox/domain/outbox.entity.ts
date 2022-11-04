import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { OutboxStatus } from '../outbox.enum';
import { IOutboxModel } from './outbox.model';

@Entity('outboxes')
export class Outbox implements IOutboxModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  aggregateId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  aggregateType: string;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  payload: any;

  @Index('idx_outbox_topic')
  @Column({
    type: 'varchar',
    nullable: false,
  })
  topic: string;

  @Index('idx_outbox_status')
  @Column({
    type: 'varchar',
    nullable: false,
    default: OutboxStatus.NEW,
  })
  status: OutboxStatus;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;
}
