import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  public async getAllTasks(): Promise<TaskDTO[]> {
    return await this.service.getAllTasks()
  }

  @Get('/:id')
  public async getTask(@Param('id') id: string): Promise<TaskDTO> {
    return await this.service.getTaskById(id)
  }
  
  @Post()
  public async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<TaskDTO> {
    return await this.service.createTask(createTaskDTO)
  }

  @Put('/:id')
  public async updateTask(@Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO): Promise<TaskDTO> {
    return await this.service.updateTask(id, updateTaskDTO)
  }
}