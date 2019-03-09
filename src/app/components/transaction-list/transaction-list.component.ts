import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit() {
  }

}
