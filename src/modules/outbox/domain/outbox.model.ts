import { OutboxStatus } from '../outbox.enum';

export interface IOutboxModel {
  readonly id: number;
  readonly aggregateId: number;
  readonly aggregateType: string;
  readonly payload: any;
  readonly topic: string;
  readonly status: OutboxStatus;
  readonly created_at: Date;
}
