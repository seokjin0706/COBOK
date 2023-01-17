import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Payload } from './payload.interface';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { User } from '../entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECREY_KEY'),
    });
  }

  async validate(payload: Payload): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: payload.id });
    if (!user) {
      throw new UnauthorizedException({ message: 'user does not exist' });
    }
    return user;
  }
}
