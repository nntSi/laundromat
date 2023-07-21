import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { MachineModule } from './machine/machine.module';
import { DateService } from './date/date.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CornjobService } from './cronjob/cronjob.service';
import { GatewayModule } from './gateway/gateway.module';
import { LineModule } from './line/line.module';

@Module({
  imports: [
    CustomerModule,
    MachineModule,
    ScheduleModule.forRoot(),
    GatewayModule,
    LineModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateService, CornjobService],
})
export class AppModule {}
