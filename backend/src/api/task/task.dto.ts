import { IsString, IsBoolean, IsOptional, IsUUID, IsDate } from 'class-validator';

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
}