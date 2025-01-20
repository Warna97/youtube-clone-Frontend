import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="w-64 bg-white h-screen p-4">
      <div class="space-y-4">
        <a routerLink="/" class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a routerLink="/explore" class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
          <i class="fas fa-compass"></i>
          <span>Explore</span>
        </a>
        <a routerLink="/subscriptions" class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
          <i class="fas fa-play-circle"></i>
          <span>Subscriptions</span>
        </a>
        
        <!-- Add new navigation items -->
        <div class="border-t pt-4">
          <a routerLink="/library" class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
            <i class="fas fa-clock"></i>
            <span>Library</span>
          </a>
          <a routerLink="/history" class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
            <i class="fas fa-history"></i>
            <span>History</span>
          </a>
          <a routerLink="/playlist" class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
            <i class="fas fa-list"></i>
            <span>Your Videos</span>
          </a>
          <a routerLink="/liked" class="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
            <i class="fas fa-thumbs-up"></i>
            <span>Liked Videos</span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}