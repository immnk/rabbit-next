import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG_TOKEN } from 'src/app/services/config.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-voice-chat',
  templateUrl: './voice-chat.component.html',
  styleUrls: ['./voice-chat.component.scss']
})
export class VoiceChatComponent implements OnInit, OnDestroy {
  buySub: Subscription;
  priceSub: Subscription;
  errorsSub: Subscription;
  errorMsg: string;
  price: string;
  item: string;
  allSub: Subscription;
  userSaid: string;
  canibuy: string;

  constructor(
    public activeModal: NgbActiveModal,
    public speech: SpeechRecognitionService,
    public http: HttpClient,
    private storage: LocalStorageService,
    @Inject(APP_CONFIG_TOKEN) private config: AppConfig) {

  }

  ngOnInit() {
    console.log('VoiceChatComponent is init');
    this.speech.init();
    this._listenForBuy();
    this._listenForPrice();
    this._listenErrors();
    this._listenForAll();
  }

  ngOnDestroy() {
    this.buySub.unsubscribe();
    this.priceSub.unsubscribe();
    this.errorsSub.unsubscribe();
    this.allSub.unsubscribe();
  }

  private _listenForBuy() {
    this.buySub = this.speech.words$.pipe(
      filter(obj => obj.type === 'buy'),
      map(obj => obj.word)
    ).subscribe(
      buy => {
        this._setError();
        console.log('Do you intend to buy? ', buy);
        this.item = buy;
      }
    );
  }

  private _listenForAll() {
    this.allSub = this.speech.all$.subscribe(data => {
      console.log(data);
      this.userSaid = data;
      this.processForLowStrength(data[0]);
    })
  }

  private _listenForPrice() {
    this.priceSub = this.speech.words$.pipe(
      filter(obj => obj.type === 'price'),
      map(obj => obj.word)
    ).subscribe(
      price => {
        this._setError();
        console.log('Do you intend to put price? ', price);
        this.price = price;
      }
    );
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  private processForLowStrength(data) {
    const intents = data.split(' ');
    const buyIndex = intents.indexOf('buy');
    const priceIndex = intents.indexOf('price');
    if (buyIndex > -1) { this.item = intents[buyIndex + 1]; }
    if (priceIndex > -1) { this.price = intents[priceIndex + 1]; }
  }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }

  check() {
    let options = {
      headers: {},
      params: {
        'customer_id': this.storage.retrieve(this.config.CUSTOMER_KEY_STORAGE),
        'price': this.price,
        'item': this.item
      }
    }
    this.http.get(this.config.canibuy, options)
      .subscribe((res: any) => {
        this.canibuy = res;
      });
  }
}