import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {APPEvent} from '../../shared/models/event.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: APPEvent[] = [];
  searchValue = '';
  searchPlaceHolder = 'Сумма';
  searchField = 'amount';

  constructor() {
  }

  ngOnInit() {
  }

  getEventClass(e: APPEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string) {
    const namesMap = {
      'amount': 'Сумма',
      'date': 'Дата',
      'category': 'Категория',
      'type': 'Тип'
    };
    this.searchPlaceHolder = namesMap[field];
    this.searchField = field;
  }

}
