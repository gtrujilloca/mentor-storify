import { CartAlertsMessages } from '@/core/constants/alerts.constants';
import { StateFaccade } from '@/ui/state/services/state-faccade.service';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  private readonly _stateSrv = inject(StateFaccade);
  alertData$ = this._stateSrv.alertData$
  messages = CartAlertsMessages;

  hideAlert(): void {
    this._stateSrv.hideAlert();
  }
}
