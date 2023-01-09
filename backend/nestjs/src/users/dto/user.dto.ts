import { IsNumber, IsString } from 'class-validator';
export class UserDto {
  @IsNumber()
  id: number;
  @IsString()
  userName: string;
  @IsString()
  password: string;
  @IsString()
  apiKey: string;
  @IsString()
  apiSecretKey: string;
}
