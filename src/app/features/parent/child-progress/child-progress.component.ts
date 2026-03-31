import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionStore } from '../store/subscription.store';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-child-progress',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, BadgeComponent, AvatarComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center">
            <span class="material-icons text-[#0ABAB5] text-3xl">family_restroom</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Parent Dashboard</h1>
            <p class="text-gray-600 font-medium">Monitor your child's progress and manage your subscription.</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Child Progress Card -->
        <app-card class="block">
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center">
                <span class="material-icons text-black">face</span>
              </div>
              <h3 class="text-xl font-black text-black">Child Progress</h3>
            </div>
            
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <app-avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" size="xl"></app-avatar>
              
              <div class="flex-1 w-full text-center sm:text-left">
                <h4 class="text-2xl font-black text-black">Alex</h4>
                <p class="text-gray-500 font-bold mb-4">Grade 5 Student</p>
                
                <div class="space-y-2">
                  <div class="flex justify-between text-sm font-bold">
                    <span class="text-gray-600">Overall Progress</span>
                    <span class="text-[#0ABAB5]">65%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-4 border-2 border-black overflow-hidden">
                    <div class="bg-[#0ABAB5] h-full rounded-full border-r-2 border-black" style="width: 65%"></div>
                  </div>
                </div>
                
                <div class="mt-6 flex justify-center sm:justify-start">
                  <app-button variant="secondary" size="sm">View Detailed Report</app-button>
                </div>
              </div>
            </div>
          </div>
        </app-card>

        <!-- Subscription Card -->
        <app-card class="block">
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center">
                <span class="material-icons text-black">card_membership</span>
              </div>
              <h3 class="text-xl font-black text-black">Subscription Status</h3>
            </div>
            
            @if (subscriptionStore.loading()) {
              <div class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0ABAB5]"></div>
              </div>
            } @else if (subscriptionStore.currentSubscription()) {
              <div class="space-y-6">
                <div class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-black">
                  <span class="font-bold text-gray-600">Current Plan</span>
                  <app-badge [variant]="'primary'">{{ subscriptionStore.currentPlan()?.name || 'Unknown' }}</app-badge>
                </div>
                
                <div class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-black">
                  <span class="font-bold text-gray-600">Status</span>
                  <app-badge [variant]="subscriptionStore.isActive() ? 'success' : 'warning'">
                    {{ subscriptionStore.currentSubscription()?.status }}
                  </app-badge>
                </div>
                
                <div class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-black">
                  <span class="font-bold text-gray-600">Renews On</span>
                  <span class="font-black text-black">
                    {{ subscriptionStore.currentSubscription()?.currentPeriodEnd | date:'mediumDate' }}
                  </span>
                </div>
                
                <div class="pt-4 flex gap-3">
                  <app-button variant="primary" class="flex-1">Manage Plan</app-button>
                  <app-button variant="secondary" class="flex-1">View Invoices</app-button>
                </div>
              </div>
            } @else {
              <div class="text-center py-8">
                <p class="text-gray-500 font-bold mb-4">No active subscription found.</p>
                <app-button variant="primary">View Plans</app-button>
              </div>
            }
          </div>
        </app-card>
      </div>
    </div>
  `
})
export class ChildProgressComponent implements OnInit {
  subscriptionStore = inject(SubscriptionStore);

  ngOnInit() {
    this.subscriptionStore.loadSubscription();
  }
}
