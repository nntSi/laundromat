import { BadRequestException, Injectable } from '@nestjs/common';
import { Machine, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MachineService {
  constructor(private prismaService: PrismaService) {}

  async create(machine: Prisma.MachineCreateInput): Promise<Machine> {
    try {
      return this.prismaService.machine.create({ data: machine });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findAll(filter: Prisma.MachineFindManyArgs): Promise<Machine[]> {
    try {
      return this.prismaService.machine.findMany(filter);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async updateOne(
    id: number,
    machine: Prisma.MachineUpdateInput,
  ): Promise<Machine> {
    try {
      return this.prismaService.machine.update({
        where: {
          id,
        },
        data: machine,
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async setInitial() {
    await this.prismaService.machine.updateMany({
      data: { active: false },
    });
  }

  async findOne(filter: Prisma.MachineFindFirstArgs): Promise<Machine> {
    try {
      return this.prismaService.machine.findFirst(filter);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async washing(id: number): Promise<Machine> {
    try {
      return this.prismaService.machine.update({
        where: { id },
        data: { active: true },
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async washingFinshed(id: number): Promise<Machine> {
    try {
      return this.prismaService.machine.update({
        where: { id },
        data: { active: false },
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async destroy(id: number): Promise<Machine> {
    return this.prismaService.machine.delete({ where: { id } });
  }
}
