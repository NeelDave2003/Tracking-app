import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiceService {
  getHello() {
    return {
      message: 'Hello from User Service',
    };
  }
}