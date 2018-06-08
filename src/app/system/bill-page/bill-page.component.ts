import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';
import {Subscription} from 'rxjs/Subscription';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    // this.billService.getBill()
    //   .subscribe((bill: Bill) => {
    //     console.log(bill);
    //   });

    this.subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((bill: [Bill, any]) => {
      console.log(bill);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
