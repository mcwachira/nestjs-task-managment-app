import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

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
  // createTask(createTaskDto: CreateTaskDto){
  //
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   }
  //
  //   this.tasks.push(task);
  //   return task;
  // }
  //
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id)
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
