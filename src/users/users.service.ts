import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', role: 'Employee' },
    { id: 2, name: 'Jane Smith', role: 'Manager' },
    { id: 3, name: 'Alice Johnson', role: 'Intern' },
    { id: 4, name: 'Bob Brown', role: 'Employee' },
    { id: 5, name: 'Charlie White', role: 'Manager' },
    { id: 6, name: 'Diana Green', role: 'Intern' },
    { id: 7, name: 'Ethan Blue', role: 'Employee' },
  ];
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(role?: 'Intern' | 'Employee' | 'Manager') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.filter((e) => e.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
