import { IsString, IsBoolean, IsOptional, IsUUID, IsDate, IsEnum } from 'class-validator';

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export class TaskDTO {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  completed?: boolean;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}

export class CreateTaskDTO {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority = TaskPriority.LOW;
}

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority = TaskPriority.LOW;
}