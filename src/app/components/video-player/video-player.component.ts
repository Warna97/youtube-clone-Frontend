import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { CommentComponent } from '../comments/comment.component';
import { VideoRecommendationsComponent } from '../video-recommendations/video-recommendations.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, CommentComponent, VideoRecommendationsComponent],
  template: `
    <div class="flex flex-col lg:flex-row p-4">
      <div class="lg:w-3/4">
        <!-- Video Player -->
        <div class="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
          <iframe
            [src]="videoUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>

        <!-- Video Info -->
        <div class="mt-4">
          <h1 class="text-xl font-bold">{{ video?.title }}</h1>
          
          <div class="flex justify-between items-center mt-2">
            <div class="flex items-center space-x-4">
              <img 
                [src]="video?.channelAvatar || 'assets/default-avatar.png'" 
                class="w-10 h-10 rounded-full"
                alt="Channel avatar"
              >
              <div>
                <h3 class="font-medium">{{ video?.channelTitle }}</h3>
                <p class="text-sm text-gray-600">{{ video?.subscriberCount | number }} subscribers</p>
              </div>
              <button 
                class="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                (click)="toggleSubscription()"
              >
                {{ isSubscribed ? 'Subscribed' : 'Subscribe' }}
              </button>
            </div>

            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <button 
                  class="flex items-center space-x-1 px-4 py-2 rounded-full hover:bg-gray-100"
                  (click)="toggleLike()"
                >
                  <i class="fas" [class.fa-thumbs-up]="!isLiked" [class.fa-thumbs-up-filled]="isLiked"></i>
                  <span>{{ video?.likes | number }}</span>
                </button>
                <button 
                  class="flex items-center space-x-1 px-4 py-2 rounded-full hover:bg-gray-100"
                  (click)="toggleDislike()"
                >
                  <i class="fas" [class.fa-thumbs-down]="!isDisliked" [class.fa-thumbs-down-filled]="isDisliked"></i>
                  <span>{{ video?.dislikes | number }}</span>
                </button>
              </div>
              
              <button 
                class="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100"
                (click)="shareVideo()"
              >
                <i class="fas fa-share"></i>
                <span>Share</span>
              </button>
              
              <button 
                class="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100"
                (click)="saveToPlaylist()"
              >
                <i class="fas fa-list"></i>
                <span>Save</span>
              </button>
              
              <button 
                class="px-2 py-2 rounded-full hover:bg-gray-100"
                [class.rotate-180]="showMoreOptions"
                (click)="toggleMoreOptions()"
              >
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>

          <!-- Video Description -->
          <div class="mt-4 bg-gray-50 rounded-lg p-4">
            <div class="flex items-center space-x-4 text-sm text-gray-600">
              <span>{{ video?.viewCount | number }} views</span>
              <span>{{ video?.publishedAt | date }}</span>
            </div>
            
            <div class="mt-2" [class.line-clamp-3]="!showFullDescription">
              <p>{{ video?.description }}</p>
            </div>
            
            <button 
              class="mt-2 text-sm font-medium"
              (click)="toggleDescription()"
            >
              {{ showFullDescription ? 'Show less' : 'Show more' }}
            </button>
          </div>
        </div>

        <!-- Comments Section -->
        <app-comments 
          [videoId]="videoId"
          [commentCount]="video?.commentCount || 0"
        ></app-comments>
      </div>

      <!-- Recommendations Section -->
      <div class="lg:w-1/4 lg:pl-4 mt-4 lg:mt-0">
        <app-video-recommendations 
          [currentVideoId]="videoId"
        ></app-video-recommendations>
      </div>
    </div>
  `
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  videoId: string = '';
  video: Video | null = null;
  videoUrl: SafeResourceUrl | null = null;
  isSubscribed: boolean = false;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  showMoreOptions: boolean = false;
  showFullDescription: boolean = false;
  private routeSub: Subscription | null = null;
  private authSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.videoId = params['id'];
      this.loadVideo();
    });

    this.authSub = this.authService.currentUser$.subscribe(user => {
      if (user) {
        // Load user-specific data like liked status, subscriptions, etc.
        this.loadUserVideoData();
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.authSub?.unsubscribe();
  }

  private loadVideo(): void {
    this.videoService.getVideoById(this.videoId).subscribe(
      video => {
        this.video = video;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${this.videoId}`
        );
      }
    );
  }

  private loadUserVideoData(): void {
    // Load user-specific data like liked status, subscriptions, etc.
    // This would be implemented in your actual application
  }

  toggleSubscription(): void {
    this.isSubscribed = !this.isSubscribed;
    // Implement actual subscription logic
  }

  toggleLike(): void {
    if (!this.isLiked) {
      this.isLiked = true;
      this.isDisliked = false;
      // Implement actual like logic
    } else {
      this.isLiked = false;
      // Remove like
    }
  }

  toggleDislike(): void {
    if (!this.isDisliked) {
      this.isDisliked = true;
      this.isLiked = false;
      // Implement actual dislike logic
    } else {
      this.isDisliked = false;
      // Remove dislike
    }
  }

  shareVideo(): void {
    // Implement share functionality
    console.log('Sharing video:', this.videoId);
  }

  saveToPlaylist(): void {
    // Implement save to playlist functionality
    console.log('Saving to playlist:', this.videoId);
  }

  toggleMoreOptions(): void {
    this.showMoreOptions = !this.showMoreOptions;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}