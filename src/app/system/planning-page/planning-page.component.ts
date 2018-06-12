import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {APPEvent} from '../shared/models/event.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  constructor(
    private billService: BillService,
    private catService: CategoriesService,
    private eventService: EventsService
  ) {
  }

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: APPEvent[] = [];
  sub1: Subscription;

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.catService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], APPEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  getCatCost(cat: Category): number {
    const catEvents = this.events
      .filter(e => e.category === cat.id && e.type === 'outcome')
      .reduce((total, e) => {
        total += e.amount;
        return total;
      }, 0);

    return catEvents;
  }

  getEvents() {

  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCatCost(cat) / cat.capacity);
    return percent > 100 ? 100 : percent;
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }
}
