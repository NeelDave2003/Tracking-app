import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import type {
    HelloResponse,
    UserGrpcService,
} from './interface/user-service.interface';

@Injectable()
export class UsersService implements OnModuleInit {
    private userService!: UserGrpcService;

    constructor(
        @Inject('USER_SERVICE')
        private readonly client: ClientGrpc,
    ) { }

    onModuleInit() {
        this.userService =
            this.client.getService<UserGrpcService>('UserService');
    }

    async getHello(): Promise<HelloResponse> {
        return firstValueFrom(this.userService.getHello({}));
    }
}