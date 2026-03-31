import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {roleGuard} from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
  },
  {
    path: 'student',
    loadChildren: () => import('./features/student/student.routes'),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['STUDENT'] }
  },
  {
    path: 'teacher',
    loadChildren: () => import('./features/teacher/teacher.routes'),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['TEACHER'] }
  },
  {
    path: 'parent',
    loadChildren: () => import('./features/parent/parent.routes'),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['PARENT'] }
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes'),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/auth/components/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'for-students',
    loadComponent: () => import('./features/landing/student-landing/student-landing.component').then(m => m.StudentLandingComponent)
  },
  {
    path: 'for-teachers',
    loadComponent: () => import('./features/landing/teacher-landing/teacher-landing.component').then(m => m.TeacherLandingComponent)
  },
  {
    path: 'for-parents',
    loadComponent: () => import('./features/landing/parent-landing/parent-landing.component').then(m => m.ParentLandingComponent)
  },
  { path: '**', redirectTo: '' }
];
