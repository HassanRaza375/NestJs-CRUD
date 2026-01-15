import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', role: 'Employee', email: 'Abc@gmail.com' },
    { id: 2, name: 'Jane Smith', role: 'Manager', email: 'Abc@gmail.com' },
    { id: 3, name: 'Alice Johnson', role: 'Intern', email: 'Abc@gmail.com' },
    { id: 4, name: 'Bob Brown', role: 'Employee', email: 'Abc@gmail.com' },
    { id: 5, name: 'Charlie White', role: 'Manager', email: 'Abc@gmail.com' },
    { id: 6, name: 'Diana Green', role: 'Intern', email: 'Abc@gmail.com' },
    { id: 7, name: 'Ethan Blue', role: 'Employee', email: 'Abc@gmail.com' },
  ];
  create(createUserDto: CreateUserDto) {
    const HighestId = this.users.reduce(
      (max, user) => Math.max(max, user.id),
      0,
    );
    const newUser = { id: HighestId + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
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
    let updatedObj = this.findOne(id);
    this.users = this.users.map((e) =>
      e.id === id ? { ...e, ...updateUserDto } : e,
    );
    return updatedObj;
  }

  remove(id: number) {
    let deletedObj = this.findOne(id);
    this.users = this.users.filter((e) => e.id !== id);
    return deletedObj;
  }
}
