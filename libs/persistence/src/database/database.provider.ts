import { db } from './db';

export const DATABASE = Symbol('DATABASE');

export const DatabaseProvider = {
    provide: DATABASE,
    useValue: db,
};