import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Prisma } from '@prisma/client';
import { AddCoinDto } from './dto/customer.dto';
import { UseMachineDto } from 'src/machine/dto/machine.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('signin')
  async signInCustomer(@Body() customer: Prisma.CustomerCreateInput) {
    return this.customerService.signInCustomer(customer);
  }

  @Post('addcoin')
  async addCoin(@Body() req: AddCoinDto) {
    return this.customerService.addCoin(req.lineId, req.coin);
  }

  @Post('usemachine')
  async useMachine(@Body() data: UseMachineDto) {
    return this.customerService.useMachine(data);
  }
}
