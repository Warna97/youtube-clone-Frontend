import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      <div *ngFor="let video of videos" class="cursor-pointer" [routerLink]="['/video', video.id]">
        <img [src]="video.thumbnailUrl" class="w-full rounded-lg">
        <div class="mt-2">
          <h3 class="font-medium">{{ video.title }}</h3>
          <p class="text-gray-600">{{ video.channelTitle }}</p>
          <p class="text-gray-600">
            {{ video.viewCount | number }} views • 
            {{ video.publishedAt | date }}
          </p>
        </div>
      </div>
    </div>
  `
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(
      videos => this.videos = videos
    );
  }
}