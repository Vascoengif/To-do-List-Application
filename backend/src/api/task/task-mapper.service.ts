import { Injectable } from "@nestjs/common";
import { TaskEntity } from "./entities/task.entity";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "./task.dto";
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class TaskMapper {
  public toDto(entity: TaskEntity): TaskDTO {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      completed: entity.completed,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }

  public createTaskDTOtoEntity(dto: CreateTaskDTO): TaskEntity {
    return {
      id: uuidv4(),
      title: dto.title,
      description: dto.description
    };
  }

  public updateTaskDTOtoEntity(entity: TaskEntity, dto: UpdateTaskDTO): TaskEntity {
    return {
      ...entity,
      title: dto.title ?? entity.title,
      description: dto.description ?? entity.description,
      completed: dto.completed ?? entity.completed
    };
  }
}
