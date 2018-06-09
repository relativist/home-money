import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';
import {Subscription} from 'rxjs/Subscription';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService, private userService: UserService) {
  }

  ngOnInit() {
    // this.billService.getBill()
    //   .subscribe((bill: Bill) => {
    //     console.log(bill);
    //   });

    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  onRefresh() {
    this.isLoaded = false;

    this.sub2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }
}
