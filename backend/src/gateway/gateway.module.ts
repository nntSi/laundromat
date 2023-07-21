import { Module } from '@nestjs/common';
import { LaundromatGateway } from './gateway';
import { PrismaService } from 'src/prisma.service';
import { MachineService } from 'src/machine/machine.service';

@Module({
  providers: [PrismaService, MachineService, LaundromatGateway],
})
export class GatewayModule {}
