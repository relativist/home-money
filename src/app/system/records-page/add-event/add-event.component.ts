import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import {APPEvent} from '../../shared/models/event.model';
import * as moment from 'moment';
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import 'rxjs/add/operator/mergeMap';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  message: Message;
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Раход'},
  ];
  sub1: Subscription;
  sub2: Subscription;

  constructor(private eventService: EventsService,
              private billService: BillService) {
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 1000);
  }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  onSubmit(form: NgForm) {
    const {amount, description, category, type} = form.value;
    let a = amount;
    if (amount < 0) {
      a *= -1;
    }
    const event = new APPEvent(type, a, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);


    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
          let value = 0;
          if (type === 'outcome') {
            if (amount > bill.value) {
              this.showMessage(`Недостаточно средств. Нехватает ${amount - bill.value}`);
              return;
            } else {
              value = bill.value - amount;
            }

          } else {
            value = bill.value + amount;
          }
          this.sub2 = this.billService.updateBill({value, currency: bill.currency})
            .mergeMap(() => this.eventService.addEvent(event))
            .subscribe(() => {
              form.setValue({
                amount: 0,
                description: ' ',
                category: '1',
                type: 'outcome'
              });
            });
        }
      )
    ;

    this.eventService.addEvent(event);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }

    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
