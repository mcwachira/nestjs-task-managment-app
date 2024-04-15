import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

const {username, password} = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const user = new User();

    // const hashedPassword = await bcrypt.hash(password, salt);
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;

    try {
      await user.save();
    } catch (error) {
      if (error.code ==='23505'){
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    //return user
  }


  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
     const user = await this.findOneBy({ username });
    // const user = await this.findOne(id);
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }


  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}


