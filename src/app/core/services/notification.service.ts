// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  success(message: string) {
    console.log('Success:', message);
    // In a real app, use a toast library like PrimeNG MessageService
  }

  error(message: string) {
    console.error('Error:', message);
    // In a real app, use a toast library like PrimeNG MessageService
  }

  info(message: string) {
    console.info('Info:', message);
  }

  warning(message: string) {
    console.warn('Warning:', message);
  }
}
