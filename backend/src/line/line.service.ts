import { Injectable } from '@nestjs/common';
import * as line from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

@Injectable()
export class LineService {
  sendTextMessage(lineId: string, message: string) {
    client.pushMessage(lineId, {
      type: 'text',
      text: message,
    });
  }
}
