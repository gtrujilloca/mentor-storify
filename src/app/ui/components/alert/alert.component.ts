import { CartAlertsMessages } from '@/core/constants/alerts.constants';
import { AlertService } from '@/infrastructure/driven-adapters/alert.service';
import { StateFaccade } from '@/ui/state/services/state-faccade.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

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
  private readonly _stateSrv = inject(StateFaccade);
  // isAlertVisible$ = this._alertSrv.isAlertActive;
  alertData$ = this._stateSrv.alertData$
  messages = CartAlertsMessages;

  get message() {
    return this._alertSrv.message;
  }

  constructor() {}

  hideAlert(): void {
    this._stateSrv.hideAlert();
  }
}
