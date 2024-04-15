import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService) {
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  createTask(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>  {
    return this.authService.signUp(authCredentialsDto);
  }
}
