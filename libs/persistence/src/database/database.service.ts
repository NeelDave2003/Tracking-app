import { Inject, Injectable } from '@nestjs/common';
import { DATABASE } from './database.provider';

@Injectable()
export class DatabaseService {
    constructor(
        @Inject(DATABASE)
        readonly db: typeof import('./db').db,
    ) { }
}