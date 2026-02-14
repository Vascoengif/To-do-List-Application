import { Injectable } from '@nestjs/common';
import { TaskMapper } from './task-mapper.service';
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from './task.dto';
import { TaskRepository } from './task.data.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository, 
    private readonly taskMapper: TaskMapper,
  ){}

  public async getAllTasks(): Promise<TaskDTO[]> {
    const taskEntities = await this.taskRepository.findAll()
    const taskDTOs = taskEntities.map(taskEntity => this.taskMapper.toDto(taskEntity))
    return taskDTOs
  }

  public async getTaskById(id: string): Promise<TaskDTO> {
    const taskEntity = await this.taskRepository.findById(id)
    const taskDTO = this.taskMapper.toDto(taskEntity)
    return taskDTO
  }

  public async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskDTO> {
    const taskEntity = this.taskMapper.createTaskDTOtoEntity(createTaskDTO)
    const savedTaskEntity = await this.taskRepository.save(taskEntity)
    const taskDTO = this.taskMapper.toDto(savedTaskEntity)
    return taskDTO
  }

  public async updateTask(id: string, updateTaskDTO: UpdateTaskDTO): Promise<TaskDTO> {
    const taskEntity = await this.taskRepository.findById(id)
    const updatedTaskEntity = this.taskMapper.updateTaskDTOtoEntity(taskEntity, updateTaskDTO)
    const savedTaskEntity = await this.taskRepository.save(updatedTaskEntity)
    const taskDTO = this.taskMapper.toDto(savedTaskEntity)
    return taskDTO
  }

  public async deleteTask(id: string): Promise<void> {
    await this.taskRepository.deleteById(id)
  }
}
