import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '@streamstech/ui-sdk/constants';
//import moment from 'moment';
const moment:any={};
@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  constructor(private http: HttpClient) { }

  formatDate(date: any): string {
    return moment(date).format(ConstantService.DateFormat.DATEFORMAT_DD_MM_YYYY);
  }

  formatDateTime(date: any): string {
    return moment(date).format(ConstantService.DateFormat.DATETIMEFORMAT_DD_MM_YYYY);
  }
  formatDateWithTime(date: any): string {
    const formattedDate = moment(date).format(ConstantService.DateFormat.DATETIMEFORMAT_DD_MM_YYYY);
    return formattedDate;
  }
  isInvalidDate(date: any): boolean {
    // try to use moment to check the valid date
    return date === '0001-01-01T00:00:00' || !date;
  }

}
