import { Injectable, Post } from '@nestjs/common';

@Injectable({})

export class AuthService {
  login() {
    return {
      message: 'Login successful',
    };
  }
  signup() {
    return {
      message: 'Signup successful',
    };
  }
}
