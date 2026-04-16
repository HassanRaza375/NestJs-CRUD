import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 2, name: 'Jane', role: 'customer' },
    { id: 2, name: 'Jane', role: 'customer' },
    { id: 2, name: 'Jane', role: 'customer' },
    { id: 2, name: 'Jane', role: 'customer' },
    { id: 3, name: 'Gull Pana', role: 'manager' },
    { id: 3, name: 'Gull Pana', role: 'manager' },
    { id: 3, name: 'Gull Pana', role: 'manager' },
    { id: 3, name: 'Gull Pana', role: 'manager' },
    { id: 3, name: 'Gull Pana', role: 'manager' },
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
  create(user: { name: string; role: string }) {
    let newId = this.users.length + 1;
    let obj = { id: newId, ...user };
    return this.users.push(obj);
  }
  update(id: number, updatedUser: { name: string; role: string }) {
    let index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { id, ...updatedUser };
    return this.findOne(id);
  }
  remove(id: number) {
    let index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    return this.users[index];
  }
}
