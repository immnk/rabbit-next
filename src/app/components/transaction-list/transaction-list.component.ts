import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig, APP_CONFIG_TOKEN } from '../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: any;
  m = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  currentMonthIndex = (new Date().getMonth() + this.m.length) % this.m.length;
  currentMonth = this.m[this.currentMonthIndex];
  lastMonth = this.m[(this.currentMonthIndex - 1 + this.m.length) % this.m.length];
  beforeLastMonth = this.m[(this.currentMonthIndex - 2 + this.m.length) % this.m.length];
  monthRadio = this.currentMonth;

  constructor(
    public route: ActivatedRoute,
    public http: HttpClient,
    private storage: LocalStorageService,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      const options = {
        headers: {},
        params: {
          account_id: params.id,
          customer_id: this.storage.retrieve(this.config.CUSTOMER_KEY_STORAGE)
        }
      }
      this.http.get(this.config.REST_END_POINT + this.config.transactions, options)
        .subscribe((res: any) => {
          this.transactions = res;
        })
    });
  }

}
