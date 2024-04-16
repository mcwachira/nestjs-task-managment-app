import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  //private to prevent changes from being made to the array by any other component that import the service
  // private tasks: Task[] = [];
  //
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  async getTaskById(
    id: number,
    @GetUser() user: User): Promise<Task> {
    const found = await this.taskRepository.getTaskById(id, user);

    if (!found) {
      throw new NotFoundException(`Task  with ${id} not found `);
    }

    return found;
  }


  async getTasks(
    filterDto: GetTasksFilterDto,
    @GetUser() user: User): Promise<Task[]>{

    return this.taskRepository.getTasks(filterDto, user);
}
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }



  async deleteTask(
    id: number,
    @GetUser() user: User): Promise<Task> {
    return this.taskRepository.deleteTask(id, user);
  }

  updateTaskStatus(
    id: number,
    status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskRepository.updateTask(id, status, user);
  }
}
