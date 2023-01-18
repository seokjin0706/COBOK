import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserDto, UserLoginDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard())
  isAuthenticated(@Req() req: Request) {
    const user = req.user;
    return user;
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
  @Post('/login')
  async login(@Body() user: UserLoginDto, @Res() res: Response) {
    const jwt = await this.usersService.login(user);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }
}
