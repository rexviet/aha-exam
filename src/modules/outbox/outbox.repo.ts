import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outbox } from './domain/outbox.entity';
import { IOutboxModel } from './domain/outbox.model';
import { OutboxStatus } from './outbox.enum';

export interface IOutboxRepository {
  getOutboxMessages(
    status: OutboxStatus,
    limit: number,
  ): Promise<IOutboxModel[]>;

  setMessageStatus(messageIds: number[], status: OutboxStatus): Promise<void>;
}

export class OutboxRepositoryImpl implements IOutboxRepository {
  constructor(
    @InjectRepository(Outbox)
    private readonly repository: Repository<Outbox>,
  ) {}

  public async getOutboxMessages(
    status: OutboxStatus,
    limit: number,
  ): Promise<IOutboxModel[]> {
    return this.repository
      .createQueryBuilder()
      .where('status = :status', { status })
      .orderBy('created_at', 'ASC')
      .take(limit)
      .getMany();
  }

  public async setMessageStatus(
    messageIds: number[],
    status: OutboxStatus,
  ): Promise<void> {
    console.log('messageIds:', messageIds);
    await this.repository
      .createQueryBuilder()
      .update(Outbox)
      .set({ status })
      .where('id IN (:...messageIds)', { messageIds })
      .execute();
  }
}
