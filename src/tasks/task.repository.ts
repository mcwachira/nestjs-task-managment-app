import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    //andWhere prevents overriding
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }


  async createTask(createTaskDto: CreateTaskDto, user:User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;

    return task;

  }
  async getById(id: number): Promise<Task> {
    const found = await this.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteTask(id: number): Promise<Task> {
    const found = await this.getById(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    const task = await this.remove(found);

    return task;
  }



  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getById(id);
    task.status = status;
    await task.save();
    return task;
  }
}