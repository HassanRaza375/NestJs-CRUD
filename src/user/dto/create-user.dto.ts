import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsEnum(['admin', 'customer', 'manager'], {
    message: 'Valid roles are admin, customer and manager',
  })
  role!: 'admin' | 'customer' | 'manager';
}
