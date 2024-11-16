import { CartAlertsMessages } from '@/core/constants/alerts.constants';
import { AlertService } from '@/infrastructure/driven-adapters/alert.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent { 
  _alertSrv = inject(AlertService)
  isAlertVisible$ = this._alertSrv.isAlertActive;
  messages = CartAlertsMessages;

  get message() {
    return this._alertSrv.message;
  }

  constructor() {}

  hideAlert(): void {
    this._alertSrv.hideAlert();
  }
}
