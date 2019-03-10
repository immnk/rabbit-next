import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-frames',
  templateUrl: './frames.component.html',
  styleUrls: ['./frames.component.scss']
})
export class FramesComponent implements OnInit {
  url: any;
  type: string;
  constructor(public route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      console.log(params.type);
      this.type = params.type;
      switch (params.type) {
        case 'cards':
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.dbs.com.sg/personal/promotion/cards-signup');
          break;
        case 'currency':
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.dbs.com.sg/personal/rates-online/foreign-currency-foreign-exchange.page');
          break;
        case 'contact':
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.dbs.com.sg/personal/support/home.html?pid=sg-dbs-pweb-header-default-help-support-textlink');
          break;
      }
    });
  }

  ngOnInit() {
  }

}
