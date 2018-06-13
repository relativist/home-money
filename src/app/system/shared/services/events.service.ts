import {BaseApi} from '../../../shared/core/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {APPEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: APPEvent): Observable<APPEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<APPEvent[]> {
    return this.getArray('events');
  }

  getEventById(id: string): Observable<APPEvent> {
    return this.get(`events/${id}`);
  }
}
