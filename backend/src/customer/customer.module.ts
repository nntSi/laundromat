import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma.service';
import { MachineService } from 'src/machine/machine.service';
import { DateService } from 'src/date/date.service';
import { CornjobService } from 'src/cronjob/cronjob.service';
import { LaundromatGateway } from 'src/gateway/gateway';
import { LineService } from 'src/line/line.service';

@Module({
  providers: [
    PrismaService,
    MachineService,
    LaundromatGateway,
    CornjobService,
    DateService,
    LineService,
    CustomerService,
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
