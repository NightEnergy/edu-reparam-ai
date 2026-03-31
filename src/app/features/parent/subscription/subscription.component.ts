import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionStore } from '../store/subscription.store';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, BadgeComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center">
            <span class="material-icons text-[#0ABAB5] text-3xl">star</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Subscription Plans</h1>
            <p class="text-gray-600 font-medium">Choose the right plan for your child's learning journey.</p>
          </div>
        </div>
      </div>

      @if (subscriptionStore.loading()) {
        <div class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-[#0ABAB5]"></div>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (plan of subscriptionStore.plans(); track plan.id) {
            <app-card class="block relative" [ngClass]="{'md:-mt-4': plan.isPopular}">
              @if (plan.isPopular) {
                <div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span class="bg-[#0ABAB5] text-white px-4 py-1 rounded-full text-sm font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    MOST POPULAR
                  </span>
                </div>
              }
              
              <div class="p-8 flex flex-col h-full" [ngClass]="{'bg-[#0ABAB5]/5 rounded-2xl': plan.isPopular}">
                <div class="text-center mb-8">
                  <h3 class="text-2xl font-black text-black mb-2">{{ plan.name }}</h3>
                  <div class="flex justify-center items-baseline">
                    <span class="text-4xl font-black text-black">\${{ plan.price }}</span>
                    <span class="text-gray-500 font-bold ml-1">/{{ plan.interval }}</span>
                  </div>
                </div>
                
                <ul class="space-y-4 mb-8 flex-1">
                  @for (feature of plan.features; track feature) {
                    <li class="flex items-start space-x-3">
                      <span class="material-icons text-[#0ABAB5] text-xl mt-0.5">check_circle</span>
                      <span class="font-bold text-gray-700">{{ feature }}</span>
                    </li>
                  }
                </ul>
                
                <div class="mt-auto">
                  <app-button 
                    [variant]="plan.isPopular ? 'primary' : 'secondary'" 
                    class="w-full"
                    [disabled]="subscriptionStore.currentSubscription()?.planId === plan.id"
                    (click)="changePlan(plan.id)">
                    {{ subscriptionStore.currentSubscription()?.planId === plan.id ? 'Current Plan' : 'Select Plan' }}
                  </app-button>
                </div>
              </div>
            </app-card>
          }
        </div>

        <!-- Billing History -->
        <div class="mt-12">
          <h2 class="text-2xl font-black text-black mb-6">Billing History</h2>
          <app-card class="block">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b-4 border-black bg-gray-100">
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm rounded-tl-xl">Date</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Amount</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Status</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-right rounded-tr-xl">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  @for (invoice of subscriptionStore.invoices(); track invoice.id) {
                    <tr class="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors">
                      <td class="p-4 font-bold text-black">{{ invoice.date | date:'mediumDate' }}</td>
                      <td class="p-4 font-bold text-gray-600">\${{ invoice.amount }}</td>
                      <td class="p-4">
                        <app-badge [variant]="invoice.status === 'PAID' ? 'success' : 'warning'">
                          {{ invoice.status }}
                        </app-badge>
                      </td>
                      <td class="p-4 text-right">
                        <button class="text-[#0ABAB5] font-bold hover:underline flex items-center justify-end w-full">
                          <span class="material-icons text-sm mr-1">download</span>
                          Download
                        </button>
                      </td>
                    </tr>
                  }
                  
                  @if (subscriptionStore.invoices().length === 0) {
                    <tr>
                      <td colspan="4" class="p-8 text-center text-gray-500 font-bold">
                        No billing history available.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </app-card>
        </div>
      }
    </div>
  `
})
export class SubscriptionComponent implements OnInit {
  subscriptionStore = inject(SubscriptionStore);

  ngOnInit() {
    this.subscriptionStore.loadSubscription();
  }

  changePlan(planId: string) {
    this.subscriptionStore.changePlan(planId);
  }
}
