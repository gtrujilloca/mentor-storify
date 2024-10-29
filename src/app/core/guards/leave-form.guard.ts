import type { CanDeactivateFn } from '@angular/router';

export interface WithoutSaving {
  canLeave: () => boolean;
}

export const leaveFormGuard: CanDeactivateFn<WithoutSaving> = (component, currentRoute, currentState, nextState) => {
  return component.canLeave();
};
