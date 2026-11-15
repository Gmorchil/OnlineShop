import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { Links } from './links';

export const forloadingInterceptor: HttpInterceptorFn = (req, next) => {
  let service = inject(Links);

  service.loadingTruck.next(true);
  return next(req).pipe(
    finalize(() => {
      service.loadingTruck.next(false);
    }),
  );
};
