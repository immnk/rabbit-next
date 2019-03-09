import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AppConfig, APP_CONFIG_TOKEN } from 'src/app/services/config.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  isError: boolean;
  customerData: any = {};

  constructor(
    fb: FormBuilder,
    public http: HttpClient,
    public router: Router,
    private storage: LocalStorageService,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig) {
    this.transferForm = fb.group({
      fromAccount: ['', Validators.required],
      payee: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.http.get(this.config.REST_END_POINT + this.config.accounts + '/' + this.storage.retrieve(this.config.CUSTOMER_KEY_STORAGE))
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.customerData = res;
    //   }, err => {
    //     console.error(err);
    //   });
  }

  transfer() {
    this.isError = false;
    if (this.transferForm.valid) {
      const body = {
        payee: this.transferForm.get('payee').value,
        amount: this.transferForm.get('amount').value
      }
      this.http.post(this.config.REST_END_POINT + this.config.transfer, body).subscribe((res: any) => {
        if (res.success) {
          console.log('transferred successfully');
        } else {
          this.isError = true;
        }
      }, err => {
        console.error('Error in logging');
        this.isError = true;
      });
    }
  }
}
