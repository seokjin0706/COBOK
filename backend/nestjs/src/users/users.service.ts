import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, UserLoginDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  async create(user: UserDto): Promise<UserDto> {
    await this.transformPassword(user);
    console.log(user);
    let userFind = await this.usersRepository.findOneBy({
      userName: user.userName,
    });
    if (userFind) {
      throw new HttpException('Username aleady used!', HttpStatus.BAD_REQUEST);
    }
    return await this.usersRepository.save(user);
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(user: UserLoginDto): Promise<{ accessToken: string }> {
    let userFind = await this.usersRepository.findOneBy({
      userName: user.userName,
    });
    if (!userFind) {
      throw new UnauthorizedException('Username does not exist');
    }
    //password 검증
    const validatePassword = await bcrypt.compare(
      user.password,
      userFind.password,
    );
    if (!validatePassword) {
      throw new UnauthorizedException('password does not match');
    }
    //JWT 토큰 생성
    const payload: Payload = { id: userFind.id, userName: userFind.userName };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async transformPassword(user: UserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
