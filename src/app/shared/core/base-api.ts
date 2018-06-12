import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';

@Injectable()
export class BaseApi {
  constructor(public http: HttpClient) {

  }

  private baseUrl = 'http://localhost:3000';

  private getUrl(url: string = ''): string {
    return this.baseUrl + '/' + url;
  }

  public get(url: string = ''): Observable<any> {
    const some = this.http.get(this.getUrl(url));
    return some.map((response: Response) => response[0] ? response[0] : response);
  }

  public getArray(url: string = ''): Observable<any> {
    const some = this.http.get(this.getUrl(url));
    return some.map((response: Response) => response);
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    const some = this.http.post(this.getUrl(url), data);
    return some.map((response: Response) => response[0] ? response[0] : response);
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    const some = this.http.put(this.getUrl(url), data);
    return some.map((response: Response) => response[0] ? response[0] : response);
  }
}
