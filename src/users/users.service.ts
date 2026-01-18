import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

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
      const rolesarray = this.users.filter((user) => user.role === role);
      if (rolesarray.length < 1) throw new NotFoundException("role not found")
      return rolesarray
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((e) => e.id === id);
    if (!user) throw new NotFoundException("user not found")
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    const removedUser = this.users.filter((e) => e.id === id)
    this.users = this.users.filter((e) => e.id !== id);
    return removedUser
  }
}
