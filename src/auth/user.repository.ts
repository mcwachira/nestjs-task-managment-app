import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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

    try{
      await user.save();
    } catch (error) {
      if(error.code ==='23505'){
        throw new ConflictException('Username already exist');
      }else {
        throw new InternalServerErrorException();
      }
    }


    //return user
  }
}


