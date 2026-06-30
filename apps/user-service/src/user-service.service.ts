import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'app/persistence';

@Injectable()
export class UserServiceService {
  constructor(
    private readonly database: DatabaseService,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }
}
