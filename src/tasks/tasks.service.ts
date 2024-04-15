import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

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
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.getById(id);

    if (!found) {
      throw new NotFoundException(`Task  with ${id} not found `);
    }

    return found;
  }
  //
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //
  //   const {status, search} = filterDto;
  //
  //   let tasks = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //
  //   return tasks;
  // }
  //
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }



  async deleteTask(id: number): Promise<Task> {
    return this.taskRepository.deleteTask(id);
  }

  updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.taskRepository.updateTask(id, status);
  }
}
