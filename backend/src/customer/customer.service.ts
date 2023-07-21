import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Customer, History, Machine, Prisma } from '@prisma/client';
import { MachineService } from 'src/machine/machine.service';
import { UseMachineDto } from 'src/machine/dto/machine.dto';
import { DateService } from 'src/date/date.service';
import { CornjobService } from 'src/cronjob/cronjob.service';
import { LaundromatGateway } from 'src/gateway/gateway';
import { LineService } from 'src/line/line.service';

@Injectable()
export class CustomerService {
  constructor(
    private prismaService: PrismaService,
    private machineService: MachineService,
    private dateService: DateService,
    private cronJobService: CornjobService,
    private laundryGateway: LaundromatGateway,
    private lineService: LineService,
  ) {}

  async signInCustomer(
    customer: Prisma.CustomerCreateInput,
  ): Promise<Customer> {
    try {
      const cust = await this.prismaService.customer.findFirst({
        where: { lineId: customer.lineId },
      });
      if (cust) {
        return cust;
      }
      return await this.prismaService.customer.create({ data: customer });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async addCoin(lineId: string, coin: number): Promise<Customer> {
    try {
      const { coin: coin_old } = await this.prismaService.customer.findFirst({
        where: { lineId },
      });
      const total_coin = coin + coin_old;
      return this.prismaService.customer.update({
        where: { lineId },
        data: { coin: total_coin },
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async paidCoin(lineId: string, coin: number): Promise<Customer> {
    const { coin: coin_old } = await this.prismaService.customer.findFirst({
      where: { lineId },
    });
    if (coin_old < coin) {
      throw new BadRequestException({
        msg: 'Not enough coin, please top up',
      });
    }
    const total_coin = coin_old - coin;
    return this.prismaService.customer.update({
      where: { lineId },
      data: { coin: total_coin },
    });
  }

  async useMachine(data: UseMachineDto): Promise<History> {
    const { coin, lineId, machineId } = data;
    const { active, duration } = await this.machineService.findOne({
      where: { id: machineId },
    });
    if (active) {
      throw new BadRequestException('This machine is washing');
    }
    const { id } = await this.paidCoin(lineId, coin);
    const currentDate = this.dateService.getCurrentDateInThailand();
    await this.machineService.washing(machineId);
    const history = await this.prismaService.history.create({
      data: {
        duration: duration,
        startTime: currentDate.format(),
        customerId: id,
        machineId: machineId,
      },
      include: {
        customer: true,
        machine: true,
      },
    });
    this.cronJobService.addTimeOut(duration - 1, () => {
      this.lineService.sendTextMessage(
        lineId,
        `In a minute, the ${history.machine.name} will finish washing.`,
      );
      console.log('ready');
    });
    this.cronJobService.addTimeOut(duration, async () => {
      await this.machineService.washingFinshed(machineId);
      await this.prismaService.history.update({
        where: { id: history.id },
        data: { success: true },
      });
      this.laundryGateway.emitAllMachineState();
      /* this.laundryGateway.serve */
    });
    return history;
  }
}
