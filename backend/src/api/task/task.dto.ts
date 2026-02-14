import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';

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