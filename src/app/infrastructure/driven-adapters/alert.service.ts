import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  isAlertActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  message: string = '';

  showAlert(message: string) {
    this.isAlertActive.next(true);
    this.message = message;
    setTimeout(() => {
      this.hideAlert();
    }, 3000);
  }

  hideAlert() {
    this.isAlertActive.next(false);
  }
}
