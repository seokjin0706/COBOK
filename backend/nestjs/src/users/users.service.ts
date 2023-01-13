import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async login(user: UserDto): Promise<UserDto> {
    let userFind = await this.usersRepository.findOneBy({
      userName: user.userName,
    });
    if (!userFind) {
      throw new UnauthorizedException('Username does not exist');
    }
    const validatePassword = await bcrypt.compare(
      user.password,
      userFind.password,
    );
    if (!validatePassword) {
      throw new UnauthorizedException('password does not match');
    }
    return userFind;
  }

  async transformPassword(user: UserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
