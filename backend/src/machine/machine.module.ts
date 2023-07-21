import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, MachineService],
  controllers: [MachineController],
})
export class MachineModule {}
