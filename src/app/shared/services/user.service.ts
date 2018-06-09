import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {BaseApi} from '../core/base-api';

@Injectable()
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`);
    // .map((user: User[]) => user[0] ? user[0] : undefined);
    // const userObservable = this.http.get<User>(`http://localhost:3000/users?email=${email}`);
    // return userObservable.map((user: User) => user[0] ? user[0] : undefined);
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
    // const userObservable = this.http.post('http://localhost:3000/users', user);
    // return userObservable.map((user: User) => user[0] ? user[0] : undefined);
  }
}
