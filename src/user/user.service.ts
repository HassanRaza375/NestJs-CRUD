import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'John Doe', email: 'jDy9I@example.com', role: 'admin' },
    { id: 2, name: 'Jane', email: 'jane@example.com', role: 'customer' },
    { id: 3, name: 'Gull Pana', email: 'gull@example.com', role: 'manager' },
  ];
  findAll(role?: 'admin' | 'customer' | 'manager') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
  create(createUserDto: CreateUserDto) {
    const newId = this.users.length + 1;

    const obj = { id: newId, ...createUserDto };

    this.users.push(obj);

    return obj;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
    };

    return this.users[index];
  }
  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) return null;

    const removed = this.users[index];

    this.users.splice(index, 1);

    return removed;
  }
}
