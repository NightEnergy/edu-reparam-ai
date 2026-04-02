import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressStore } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';

@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <!-- Welcome Card -->
      <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        @if (progressStore.loading()) {
          <div class="animate-pulse space-y-2">
            <div class="h-8 bg-gray-200 rounded-xl w-1/3"></div>
            <div class="h-4 bg-gray-200 rounded-xl w-1/2"></div>
          </div>
        } @else {
          <h1 class="text-2xl font-bold text-black">Good morning, Student!</h1>
          <p class="text-gray-600 mt-2">Ready to learn something new today?</p>
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Streak Widget -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center space-x-4">
          @if (progressStore.loading()) {
            <div class="animate-pulse flex items-center space-x-4 w-full">
              <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div class="h-5 bg-gray-200 rounded-xl"></div>
                <div class="h-4 bg-gray-200 rounded-xl w-2/3"></div>
              </div>
            </div>
          } @else {
            <div class="w-16 h-16 bg-[#0ABAB5] rounded-full flex items-center justify-center border-2 border-black">
              <span class="material-icons text-white text-3xl">local_fire_department</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-black">{{ progressStore.activeStreak() }} Day Streak</h3>
              <p class="text-sm text-gray-600">Keep it going!</p>
            </div>
          }
        </div>

        <!-- Overall Progress -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center space-x-4">
          @if (progressStore.loading()) {
            <div class="animate-pulse flex items-center space-x-4 w-full">
              <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div class="h-5 bg-gray-200 rounded-xl"></div>
                <div class="h-4 bg-gray-200 rounded-xl w-2/3"></div>
              </div>
            </div>
          } @else {
            <div class="w-16 h-16 rounded-full border-4 border-[#0ABAB5] flex items-center justify-center">
              <span class="font-bold text-black">{{ progressStore.overallProgress() }}%</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-black">Overall Progress</h3>
              <p class="text-sm text-gray-600">12 of 48 lessons</p>
            </div>
          }
        </div>

        <!-- Continue Learning -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          @if (progressStore.loading()) {
            <div class="animate-pulse space-y-2">
              <div class="h-6 bg-gray-200 rounded-xl mb-2"></div>
              <div class="h-4 bg-gray-200 rounded-xl mb-4 w-3/4"></div>
              <div class="h-10 bg-gray-200 rounded-xl"></div>
            </div>
          } @else {
            <h3 class="text-lg font-bold text-black mb-2">Continue Learning</h3>
            <p class="text-sm font-medium text-gray-800 mb-4">Introduction to Fractions</p>
            <button class="w-full py-2 bg-[#0ABAB5] text-white font-bold rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
              Continue
            </button>
          }
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 class="text-xl font-bold text-black mb-4">Recent Activity</h3>
        <ul class="space-y-4">
          @if (progressStore.loading()) {
            @for (i of [1, 2, 3]; track i) {
              <li class="flex items-center space-x-4 border-b-2 border-black pb-4 last:border-0 last:pb-0 animate-pulse">
                <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div class="space-y-2 flex-1">
                  <div class="h-4 bg-gray-200 rounded-xl w-1/2"></div>
                  <div class="h-3 bg-gray-200 rounded-xl w-1/4"></div>
                </div>
              </li>
            }
          } @else {
            @for (activity of progressStore.recentActivity(); track activity.id) {
              <li class="flex items-center space-x-4 border-b-2 border-black pb-4 last:border-0 last:pb-0">
                <div class="w-10 h-10 bg-[#0ABAB5]/20 rounded-full flex items-center justify-center border-2 border-black">
                  <span class="material-icons text-[#0ABAB5]">check_circle</span>
                </div>
                <div>
                  <p class="font-bold text-black">{{ activity.title }}</p>
                  <p class="text-xs text-gray-500">{{ activity.date | date:'short' }}</p>
                </div>
              </li>
            }
          }
        </ul>
      </div>
    </div>
  `
})
export class ProgressDashboardComponent implements OnInit {
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);

  ngOnInit() {
    this.progressStore.loadDashboard();
  }
}
