import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MachineService } from 'src/machine/machine.service';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class LaundromatGateway implements OnModuleInit {
  constructor(private readonly machineService: MachineService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.setInitial();

    /* this.machineService.setInitial();
    this.server.emit('machines', {
      machines,
    }); */
    /* this.server.on('connection', (socket) => {
      console.log(socket.id);
    }); */
  }

  @SubscribeMessage('MachineState')
  async onMachineState() {
    this.emitAllMachineState();
  }

  setInitial() {
    this.machineService.setInitial();
    this.emitAllMachineState();
    setTimeout(() => {
      this.emitAllMachineState();
    }, 1000);
  }

  async emitAllMachineState() {
    const machines = await this.machineService.findAll({
      include: {
        history: {
          orderBy: [{ id: 'desc' }],
          take: 5,
          include: { customer: true },
        },
      },
    });

    this.server.emit('machines', {
      machines,
    });
  }
}
