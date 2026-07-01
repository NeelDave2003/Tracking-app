import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) { }

  @GrpcMethod("UserService", "GetHello")
  getHello() {
    return this.userServiceService.getHello();
  }
}
