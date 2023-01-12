import { IsString } from 'class-validator';
export class UserDto {
  @IsString()
  userName: string;
  @IsString()
  password: string;
  @IsString()
  apiKey: string;
  @IsString()
  apiSecretKey: string;
}
