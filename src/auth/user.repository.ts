import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UserRepository extends Repository<User>{
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }


  async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void>{

const {username, password} = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();

    //return user
  }
}


