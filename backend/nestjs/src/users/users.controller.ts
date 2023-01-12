import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: number): Promise<User> {
    console.log(typeof id);
    return this.usersService.findOne(id);
  }
  @Post()
  async create(@Body() user: UserDto) {
    return await this.usersService.create(user);
  }
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
