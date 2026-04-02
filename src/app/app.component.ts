import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './shell/header/header.component';
import {SidebarComponent} from './shell/sidebar/sidebar.component';
import {AuthStore} from './features/auth/store/auth.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authStore = inject(AuthStore);

  constructor() {
    this.authStore.init();
  }
}
