import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    protected readonly repository: Repository<TaskEntity>
  ) {}

  protected get tableAlias(): string {
    return 'task';
  }

  public async findAll(): Promise<TaskEntity[]> {
    const entities = await this.repository.createQueryBuilder(this.tableAlias)
      .where(`${this.tableAlias}.deletedAt is null`)
      .getMany();

    return entities;
  }

  public async findById(id: string): Promise<TaskEntity> {
    const entity = await this.repository
      .createQueryBuilder(this.tableAlias)
      .where(`${this.tableAlias}.deletedAt is null`)
      .andWhere(`${this.tableAlias}.id::varchar = :id`, { id })
      .getOne();

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  public async save(entity: TaskEntity): Promise<TaskEntity> {
    const savedEntity = await this.repository.save(entity)
    return savedEntity
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }
}