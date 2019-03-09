import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConfig, APP_CONFIG_TOKEN } from '../../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    public http: HttpClient,
    public router: Router,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig) {
    this.form = fb.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {

  }

  loginClicked() {
    if (this.form.valid) {
      const body = {
        userName: this.form.get('username').value,
        password: this.form.get('password').value
      }
      this.http.post(this.config.REST_END_POINT + this.config.login, body).subscribe((res: any) => {
        if (res.success) {
          console.log('Authenticated user');
          this.router.navigate(['/dashboard']);
        }
      }, err => {
        console.error('Error in logging');
      });
    }
  }

}
