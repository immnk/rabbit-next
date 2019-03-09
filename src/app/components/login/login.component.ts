import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfig, APP_CONFIG_TOKEN } from '../../services/config.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isError: boolean;

  constructor(
    fb: FormBuilder,
    public http: HttpClient,
    public router: Router,
    private storage: LocalStorageService,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isError = false;
  }

  loginClicked() {
    this.isError = false;
    if (this.form.valid) {
      const body = {
        userName: this.form.get('username').value,
        password: this.form.get('password').value
      }
      this.http.post(this.config.REST_END_POINT + this.config.login, body).subscribe((res: any) => {
        if (res.success) {
          console.log('Authenticated user');
          this.storage.store('boundValue', res.customer_id);
          this.router.navigate(['/dashboard']);
        } else {
          this.isError = true;
        }
      }, err => {
        console.error('Error in logging');
        this.isError = true;
      });
    } else {

    }
  }

}
