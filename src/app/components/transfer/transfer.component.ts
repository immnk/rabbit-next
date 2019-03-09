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
  constructor(
    fb: FormBuilder,
    public http: HttpClient,
    public router: Router,
    private storage: LocalStorageService,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig) {
    this.transferForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
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
