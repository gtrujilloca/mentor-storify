import type { CanMatchFn } from '@angular/router';

export const matchtestGuard: CanMatchFn = (route, segments) => {
  
  return /s/.test(route.path || '') ? false : true;
};
