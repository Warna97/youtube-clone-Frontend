import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, PlaylistComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-header></app-header>
      <div class="flex">
        <app-sidebar></app-sidebar>
        <main class="flex-1">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-playlist></app-playlist>
    </div>
  `
})
export class AppComponent {
  constructor(private authService: AuthService) {}
}