import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// TypeScript declaration for annyang
declare var annyang: any;

@Injectable()
export class SpeechRecognitionService {
  words$ = new Subject<{ [key: string]: string }>();
  errors$ = new Subject<{ [key: string]: any }>();
  all$ = new Subject<string>();
  listening = false;
  constructor(private zone: NgZone) { }

  get speechSupported(): boolean {
    return !!annyang;
  }

  init() {
    const commands = {
      'buy :item': (item) => {
        this.zone.run(() => {
          this.words$.next({ type: 'buy', word: item });
        });
      },
      'price :price': (price) => {
        this.zone.run(() => {
          this.words$.next({ type: 'price', word: price });
        });
      },
    }
    annyang.addCommands(commands);

    // Log anything the user says and what speech recognition thinks it might be
    annyang.addCallback('result', (userSaid) => {
      console.log('User may have said:', userSaid);
      this._handleAll(userSaid);
    });
    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred.', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. Say "Can I buy [item name]", OR "Item is of price [price]".',
        { results: userSaid });
    });
  }

  private _handleError(err, msg, errObj) {
    this.zone.run(() => {
      this.errors$.next({
        error: err,
        message: msg,
        obj: errObj
      });
    });
  }

  private _handleAll(msg) {
    this.zone.run(() => {
      this.all$.next(msg);
    })
  }

  startListening() {
    annyang.start();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }
}
