export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  priority: TaskPriority;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  priority?: TaskPriority;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: TaskPriority;
}

