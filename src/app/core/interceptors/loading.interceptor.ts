// src/app/core/interceptors/loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // This is a placeholder for a global loading signal
  // In a real app, you'd increment a counter in a LoadingStore
  return next(req).pipe(
    finalize(() => {
      // Decrement counter
    })
  );
};
