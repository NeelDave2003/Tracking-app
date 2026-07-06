import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import type { Queue } from 'bullmq';

import { DEFAULT_QUEUE } from './constants/queue.constant';

@Injectable()
export class QueueService {
    constructor(
        @InjectQueue(DEFAULT_QUEUE)
        private readonly queue: Queue,
    ) { }

    async add<T>(
        jobName: string,
        data: T,
    ) {
        return this.queue.add(jobName, data);
    }

    async getJob(jobId: string) {
        return this.queue.getJob(jobId);
    }

    async getWaiting() {
        return this.queue.getWaiting();
    }

    async getActive() {
        return this.queue.getActive();
    }

    async getCompleted() {
        return this.queue.getCompleted();
    }

    async getFailed() {
        return this.queue.getFailed();
    }
}