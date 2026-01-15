import { IsEmail, IsEnum } from 'class-validator';
export class CreateUserDto {
  name: string;
  @IsEnum(['Intern', 'Employee', 'Manager'], { message: 'Valid Role Required' })
  role: 'Intern' | 'Employee' | 'Manager';
  @IsEmail()
  email: string;
}
