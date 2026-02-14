import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "./entities/task.entity";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { TaskMapper } from "./task-mapper.service";
import { TaskRepository } from "./task.data.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService, TaskMapper, TaskRepository],
})
export class TaskModule {}