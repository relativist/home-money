import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string): Observable<User> {
    const userObservable = this.http.get<User>(`http://localhost:3000/users?email=${email}`);
    // console.log(userObservable);
    return userObservable.map((user: User) => user[0] ? user[0] : undefined);
    // .map((response: Response) => response.json());
    // .map((user: User) => console.log(user));
  }

  createNewUser(user: User): Observable<User> {
    const userObservable =  this.http.post('http://localhost:3000/users', user);
    return userObservable.map((user: User) => user[0] ? user[0] : undefined);
  }
}
