import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../shared/models/user.model';
import {Bill} from '../models/bill.model';

@Injectable()
export class BillService {
  constructor(private  http: HttpClient) {

  }

  getFakeBill(): Observable<User> {
    const user123 = this.http.get<User>('http://localhost:3000/users?email=w2fm@mail.ru');
    return user123.map((user: User) => user[0] ? user[0] : undefined);
  }

  getBill(): Observable<Bill> {
    const userObservable = this.http.get('http://localhost:3000/bill');
    return userObservable.map((bill: Bill) => bill);
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    const some = this.http.get(`http://data.fixer.io/api/latest?access_key=bfee11e74ca69b0c9941c0aaf3fd438a`);
    return some.map((response: Response) => response);
  }
}
