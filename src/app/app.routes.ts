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
    data: { roles: ['TEACHER', 'ADMIN'] }
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.routes'),
    canActivate: [authGuard]
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
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
