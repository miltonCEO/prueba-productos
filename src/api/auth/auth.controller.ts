import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthSerializer } from './auth.serializer';
import { ApiTags } from '@nestjs/swagger';

import { User } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersSerializer } from '../users/users.serializer';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<AuthSerializer> {
    const login = await this.authService.login(loginDto);

    return plainToClass(AuthSerializer, {
      user: login.user.toJSON(),
      accessToken: login.token,
    });
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    const user = await this.authService.register(registerDto);

    return plainToClass(UsersSerializer, user.toJSON());
  }
}
