import { Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';

export default [
  { path: 'subscription', component: SubscriptionComponent },
  { path: '', redirectTo: 'subscription', pathMatch: 'full' }
] as Routes;
