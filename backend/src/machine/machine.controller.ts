import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { Machine, Prisma } from '@prisma/client';
import { QueryMachineDto } from './dto/machine.dto';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  async createMachine(
    @Body() machine: Prisma.MachineCreateInput,
  ): Promise<Machine> {
    return this.machineService.create(machine);
  }

  @Get()
  async findAllMachine(@Query() query: QueryMachineDto): Promise<Machine[]> {
    return this.machineService.findAll({
      where: {
        id: query.id ? parseInt(query.id) : undefined,
        name: query.name ? query.name : undefined,
        size: query.size ? parseInt(query.size) : undefined,
      },
    });
  }

  @Patch(':id')
  async updateMachine(
    @Param('id') id: string,
    @Body() machine: Prisma.MachineUpdateInput,
  ): Promise<Machine> {
    return this.machineService.updateOne(parseInt(id), machine);
  }

  @Delete(':id')
  async destroyMachine(@Param('id') id: string): Promise<Machine> {
    return this.machineService.destroy(parseInt(id));
  }
}
