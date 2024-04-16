import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  //private to prevent changes from being made to the array by any other component that import the service
  // private tasks: Task[] = [];
  //
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.getById(id);

    if (!found) {
      throw new NotFoundException(`Task  with ${id} not found `);
    }

    return found;
  }


  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{

    return this.taskRepository.getTasks(filterDto);
}
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }



  async deleteTask(id: number): Promise<Task> {
    return this.taskRepository.deleteTask(id);
  }

  updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.taskRepository.updateTask(id, status);
  }
}
