import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-recommendations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-bold">Recommended Videos</h3>
      <div *ngFor="let video of recommendedVideos" 
           [routerLink]="['/video', video.id]" 
           class="flex space-x-2 cursor-pointer hover:bg-gray-100 rounded p-2">
        <img [src]="video.thumbnailUrl" 
             class="w-40 h-24 object-cover rounded" 
             [alt]="video.title">
        <div class="flex-1">
          <h4 class="font-medium line-clamp-2">{{ video.title }}</h4>
          <p class="text-sm text-gray-600">{{ video.channelTitle }}</p>
          <p class="text-sm text-gray-600">
            {{ video.viewCount | number }} views • 
            {{ video.publishedAt | date }}
          </p>
        </div>
      </div>
    </div>
  `
})
export class VideoRecommendationsComponent implements OnInit {
  @Input() currentVideoId: string = '';
  recommendedVideos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    // In a real app, you'd filter out the current video and possibly
    // use an algorithm to determine recommendations
    this.videoService.getVideos().subscribe(
      videos => this.recommendedVideos = videos
        .filter(v => v.id !== this.currentVideoId)
        .slice(0, 10)
    );
  }
}