import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(
    filterDto: GetTasksFilterDto,
    @GetUser() user: User): Promise<Task[]>{
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');


    query.where('task.userId = :userId' , {userId:user.id})

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
  async getTaskById(id: number, @GetUser() user: User): Promise<Task> {
    const found = await this.findOneBy({ id, userId: user.id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  // async deleteTask(id: number): Promise<Task> {
  //   const found = await this.getById(id);
  //
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //
  //   const task = await this.remove(found);
  //
  //   return task;
  // }



  async updateTask(id: number, status: TaskStatus, @GetUser() user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
