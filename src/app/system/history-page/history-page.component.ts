import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {Category} from '../shared/models/category.model';
import {APPEvent} from '../shared/models/event.model';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: APPEvent[] = [];
  filteredEvents: APPEvent[] = [];
  isLoaded = false;
  chartData = [];
  sub1: Subscription;
  isFilterVisible = false;


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
      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach(c => {
      const catEv = this.filteredEvents.filter(e => e.category === c.id && e.type === 'outcome');
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

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  onFilterApply(filterData) {
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.filteredEvents = this.filteredEvents.filter(e => {
      return filterData.types.indexOf(e.type) !== -1;
    }).filter(e => {
      return filterData.categories.indexOf(e.category + '') !== -1;
    }).filter(e => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod);
    });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }
}
