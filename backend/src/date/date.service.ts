import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class DateService {
  private readonly thailandTimeZone = 'Asia/Bangkok';

  getCurrentDateInThailand(): moment.Moment {
    return moment().tz(this.thailandTimeZone);
  }
}
