import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center space-x-4">
          <img [src]="currentVideo?.thumbnailUrl" 
               class="w-16 h-16 object-cover" 
               *ngIf="currentVideo">
          <div>
            <h4 class="font-medium">{{ currentVideo?.title }}</h4>
            <p class="text-sm text-gray-600">{{ currentVideo?.channelTitle }}</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="p-2"><i class="fas fa-step-backward"></i></button>
          <button class="p-2" (click)="togglePlay()">
            <i class="fas" [class.fa-play]="!isPlaying" [class.fa-pause]="isPlaying"></i>
          </button>
          <button class="p-2"><i class="fas fa-step-forward"></i></button>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="p-2" (click)="toggleShuffle()">
            <i class="fas fa-random" [class.text-blue-600]="isShuffled"></i>
          </button>
          <button class="p-2" (click)="toggleRepeat()">
            <i class="fas fa-redo" [class.text-blue-600]="isRepeating"></i>
          </button>
          <button class="p-2" (click)="minimizePlayer()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="px-4 pb-2">
        <div class="relative h-1 bg-gray-200 rounded">
          <div class="absolute h-full bg-red-600 rounded" 
               [style.width.%]="progress"></div>
        </div>
      </div>
    </div>
  `
})
export class PlaylistComponent {
  currentVideo: any = null;
  isPlaying: boolean = false;
  isShuffled: boolean = false;
  isRepeating: boolean = false;
  progress: number = 0;

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  toggleShuffle(): void {
    this.isShuffled = !this.isShuffled;
  }

  toggleRepeat(): void {
    this.isRepeating = !this.isRepeating;
  }

  minimizePlayer(): void {
    // Implement minimize logic
  }
}