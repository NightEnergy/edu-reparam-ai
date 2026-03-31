import { Routes } from '@angular/router';
import { ChildProgressComponent } from './child-progress/child-progress.component';
import { SubscriptionComponent } from './subscription/subscription.component';

export default [
  { path: 'child-progress', component: ChildProgressComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '', redirectTo: 'child-progress', pathMatch: 'full' }
] as Routes;
