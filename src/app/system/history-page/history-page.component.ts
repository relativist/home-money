import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {Category} from '../shared/models/category.model';
import {APPEvent} from '../shared/models/event.model';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: APPEvent[] = [];
  isLoaded = false;
  chartData = [];
  sub1: Subscription;

  constructor(private catService: CategoriesService,
              private eventService: EventsService
  ) {
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.catService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], APPEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.events.forEach(e => {
        e.catName = this.categories.find(c => c.id === e.category).name;
      });
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach(c => {
      const catEv = this.events.filter(e => e.category === c.id && e.type === 'outcome');
      this.chartData.push({
        name: c.name,
        value: catEv.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
