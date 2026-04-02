import { Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ProfileComponent } from './profile/profile.component';

export default [
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'subscription', pathMatch: 'full' }
] as Routes;
