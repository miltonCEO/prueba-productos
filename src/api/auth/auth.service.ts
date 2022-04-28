import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (user && isMatch) {
      const payload: JwtPayload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      };

      return { user, token: this.jwtService.sign(payload) };
    }

    throw new UnauthorizedException('Please check your credentials');
  }

  async register(registerDto: RegisterDto) {
    const userByEmail = await this.userModel.findOne({
      email: registerDto.email,
    });

    if (userByEmail) {
      throw new BadRequestException(
        `The email given (${registerDto.email}) is alredy exist`,
      );
    }

    const salt = await bcrypt.genSalt();
    const plainToHash = await bcrypt.hash(registerDto.password, salt);

    registerDto = { ...registerDto, password: plainToHash };

    const user = new this.userModel(registerDto);

    return await user.save();
  }
}
