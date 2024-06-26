import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  marriageLastName: string;

  @IsOptional()
  suffix: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  birthday: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  ltoClientId: string;

  @IsNotEmpty()
  branch: string;
}
