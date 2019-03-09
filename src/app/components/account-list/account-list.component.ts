import { Component, OnInit, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG_TOKEN } from '../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  customerData: any = {};
  graphData: any;

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Months';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    public http: HttpClient,
    private storage: LocalStorageService,
    public router: Router,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig) { }

  ngOnInit() {
    console.log('account list loaded...');
    this.http.get(this.config.REST_END_POINT + this.config.accounts + '/' + this.storage.retrieve(this.config.CUSTOMER_KEY_STORAGE))
      .subscribe((res: any) => {
        console.log(res);
        this.customerData = res;
      }, err => {
        console.error(err);
      });
    this.http.get(this.config.REST_END_POINT + this.config.GRAPH_EXPENDITURE + '/' + this.storage.retrieve(this.config.CUSTOMER_KEY_STORAGE))
      .subscribe((res: any) => {
        this.graphData = res;
      });
  }


}
