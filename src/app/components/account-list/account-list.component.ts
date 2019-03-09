import { Component, OnInit, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG_TOKEN } from '../../services/config.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  constructor(
    public http: HttpClient,
    private storage: LocalStorageService,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig) { }

  ngOnInit() {
    console.log('account list loaded...');
    const options = {
      headers: {},
      params: {
        customer_id: this.storage.retrieve('boundValue')
      }
    };
    this.http.get(this.config.REST_END_POINT + this.config.accounts, options)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

}
