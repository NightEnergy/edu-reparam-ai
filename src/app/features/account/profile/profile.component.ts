import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthStore } from '../../auth/store/auth.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CardComponent, BadgeComponent, ModalComponent],
  template: `
    <div class="p-6 max-w-4xl mx-auto space-y-8 font-sans text-black">
      <!-- Header -->
      <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8">
        <div class="relative">
          <img
            [src]="authStore.user()?.avatar"
            alt="Avatar"
            class="w-32 h-32 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            referrerpolicy="no-referrer"
          >
          <button class="absolute bottom-0 right-0 bg-[#0ABAB5] border-2 border-black p-2 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all">
            <span class="material-icons text-white text-sm">edit</span>
          </button>
        </div>

        <div class="flex-1 text-center md:text-left">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
            <h1 class="text-4xl font-black tracking-tight">{{ authStore.user()?.name }}</h1>
            <app-badge variant="primary">{{ authStore.user()?.role }}</app-badge>
          </div>
          <p class="text-gray-600 font-bold text-lg">{{ authStore.user()?.email }}</p>
          <p class="text-gray-400 font-bold text-sm uppercase tracking-widest mt-2">Member since {{ authStore.user()?.memberSince }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Column: Settings -->
        <div class="md:col-span-2 space-y-8">
          <app-card title="Personal Information">
            <form [formGroup]="profileForm" (ngSubmit)="onUpdateProfile()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-black uppercase tracking-tight mb-2">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold"
                  >
                </div>
                <div>
                  <label for="email" class="block text-sm font-black uppercase tracking-tight mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold bg-gray-50 cursor-not-allowed"
                    readonly
                  >
                </div>
              </div>

              @if (authStore.isStudent()) {
                <div>
                  <label for="grade" class="block text-sm font-black uppercase tracking-tight mb-2">Grade Level</label>
                  <select id="grade" formControlName="grade" class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold bg-white">
                    @for (g of [1,2,3,4,5,6,7,8,9,10,11,12]; track g) {
                      <option [value]="g">Grade {{ g }}</option>
                    }
                  </select>
                </div>
              }

              @if (authStore.isTeacher()) {
                <div>
                  <label for="school" class="block text-sm font-black uppercase tracking-tight mb-2">School Name</label>
                  <input
                    id="school"
                    type="text"
                    formControlName="school"
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold"
                  >
                </div>
              }

              <div class="flex justify-end">
                <app-button type="submit" [disabled]="profileForm.invalid || loading()" variant="primary">
                  @if (loading()) {
                    <span class="animate-spin material-icons mr-2">sync</span> Saving...
                  } @else {
                    Save Changes <span class="material-icons ml-2">save</span>
                  }
                </app-button>
              </div>
            </form>
          </app-card>

          <app-card title="Security">
            <form [formGroup]="passwordForm" (ngSubmit)="onChangePassword()" class="space-y-6">
              <div>
                <label for="currentPassword" class="block text-sm font-black uppercase tracking-tight mb-2">Current Password</label>
                <input
                  id="currentPassword"
                  type="password"
                  formControlName="currentPassword"
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold"
                >
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="newPassword" class="block text-sm font-black uppercase tracking-tight mb-2">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    formControlName="newPassword"
                    placeholder="••••••••"
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold"
                  >
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-black uppercase tracking-tight mb-2">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    formControlName="confirmPassword"
                    placeholder="••••••••"
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold"
                  >
                </div>
              </div>
              <div class="flex justify-end">
                <app-button type="submit" [disabled]="passwordForm.invalid || passwordLoading()" variant="secondary">
                  @if (passwordLoading()) {
                    <span class="animate-spin material-icons mr-2">sync</span> Updating...
                  } @else {
                    Update Password <span class="material-icons ml-2">lock</span>
                  }
                </app-button>
              </div>
            </form>
          </app-card>
        </div>

        <!-- Right Column: Stats/Info -->
        <div class="space-y-8">
          <app-card title="Account Status">
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="font-bold text-gray-600">Status</span>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase border-2 border-green-700">Active</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-bold text-gray-600">Verified</span>
                <span class="material-icons text-green-500">verified</span>
              </div>
              <div class="pt-4 border-t-2 border-black/5">
                <app-button variant="secondary" class="w-full" (click)="authStore.logout()">
                  Sign Out <span class="material-icons ml-2">logout</span>
                </app-button>
              </div>
            </div>
          </app-card>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  authStore = inject(AuthStore);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  loading = signal(false);
  passwordLoading = signal(false);

  profileForm = this.fb.group({
    name: [this.authStore.user()?.name || '', Validators.required],
    email: [this.authStore.user()?.email || '', [Validators.required, Validators.email]],
    grade: [this.authStore.user()?.grade || 10],
    school: [this.authStore.user()?.school || '']
  });

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: (control) => {
      const pass = control.get('newPassword');
      const confirm = control.get('confirmPassword');
      return pass && confirm && pass.value === confirm.value ? null : { mismatch: true };
    }
  });

  onUpdateProfile() {
    if (this.profileForm.valid) {
      this.loading.set(true);
      setTimeout(() => {
        const formValue = this.profileForm.value;
        const updates = {
          name: formValue.name ?? undefined,
          email: formValue.email ?? undefined,
          grade: formValue.grade ?? undefined,
          school: formValue.school ?? undefined
        };
        this.authStore.updateProfile(updates);
        this.loading.set(false);
        this.notificationService.success('Profile updated successfully!');
      }, 1000);
    }
  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      this.passwordLoading.set(true);
      setTimeout(() => {
        this.passwordLoading.set(false);
        this.passwordForm.reset();
        this.notificationService.success('Password updated successfully!');
      }, 1500);
    }
  }
}
