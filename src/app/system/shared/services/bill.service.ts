import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../shared/models/user.model';
import {Bill} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
    //   const userObservable = this.http.get('http://localhost:3000/bill');
    //   return userObservable.map((bill: Bill) => bill);
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    const some = this.http.get(`http://data.fixer.io/api/latest?access_key=bfee11e74ca69b0c9941c0aaf3fd438a`);
    return some.map((response: Response) => response);
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
    //   const userObservable = this.http.get('http://localhost:3000/bill');
    //   return userObservable.map((bill: Bill) => bill);
  }

}
