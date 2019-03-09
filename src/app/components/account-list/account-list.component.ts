import { Component, OnInit, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG_TOKEN } from '../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { data } from './data';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  customerData: any = {};

  multi: any[] = data;
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

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
  }


}
