import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CornjobService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  addCronJob(duration: number, callback: () => void) {
    const name = uuidv4();
    const minutes = Math.floor(duration / 60);
    const job = new CronJob(`*/${minutes} * * * *`, () => {
      callback();
      this.schedulerRegistry.deleteCronJob(name);
    });
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  addTimeOut(duration: number, callback: () => void) {
    const name = uuidv4();
    const timeout = setTimeout(() => {
      callback();
      this.schedulerRegistry.deleteTimeout(name);
    }, duration * 1000 * 60);
    this.schedulerRegistry.addTimeout(name, timeout);
  }
}
