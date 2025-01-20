import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <header class="flex justify-between items-center p-4 bg-white">
      <!-- Existing header content -->
      
      <div class="flex items-center">
        <button class="p-2"><i class="fas fa-video"></i></button>
        <button class="p-2"><i class="fas fa-th"></i></button>
        <button class="p-2"><i class="fas fa-bell"></i></button>
        
        <!-- Update user section -->
        <ng-container *ngIf="(authService.currentUser$ | async) as user; else loginButton">
          <div class="relative">
            <button class="p-2" (click)="toggleUserMenu()">
              <img [src]="user.avatar" class="w-8 h-8 rounded-full" [alt]="user.name">
            </button>
            <div *ngIf="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <a routerLink="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
              <button (click)="logout()" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          </div>
        </ng-container>
        <ng-template #loginButton>
          <button (click)="login()" class="px-4 py-2 text-blue-600">Sign In</button>
        </ng-template>
      </div>
    </header>
  `
})
export class HeaderComponent {
  searchQuery: string = '';
  showUserMenu: boolean = false;

  constructor(public authService: AuthService) {}

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  login(): void {
    this.authService.login('user@example.com', 'password').subscribe();
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu = false;
  }
}