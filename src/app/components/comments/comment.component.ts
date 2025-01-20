import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mt-6 border-t pt-6">
      <h3 class="text-xl font-bold mb-4">{{ commentCount }} Comments</h3>
      
      <!-- Comment Input -->
      <div class="flex space-x-4 mb-6">
        <img [src]="currentUserAvatar" class="w-10 h-10 rounded-full" alt="User">
        <div class="flex-1">
          <input 
            [(ngModel)]="newComment"
            class="w-full p-2 border rounded"
            placeholder="Add a comment..."
            (focus)="showCommentActions = true"
          >
          <div *ngIf="showCommentActions" class="flex justify-end space-x-2 mt-2">
            <button 
              class="px-4 py-2 rounded hover:bg-gray-100"
              (click)="showCommentActions = false"
            >
              Cancel
            </button>
            <button 
              class="px-4 py-2 bg-blue-600 text-white rounded"
              (click)="addComment()"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      <!-- Comment List -->
      <div class="space-y-4">
        <div *ngFor="let comment of comments" class="flex space-x-4">
          <img [src]="comment.userAvatar" class="w-10 h-10 rounded-full" alt="User">
          <div class="flex-1">
            <div class="flex items-center space-x-2">
              <span class="font-bold">{{ comment.userName }}</span>
              <span class="text-gray-500 text-sm">{{ comment.createdAt | date }}</span>
            </div>
            <p class="mt-1">{{ comment.text }}</p>
            <div class="flex items-center space-x-4 mt-2">
              <button class="flex items-center space-x-1">
                <i class="fas fa-thumbs-up"></i>
                <span>{{ comment.likes }}</span>
              </button>
              <button class="flex items-center space-x-1">
                <i class="fas fa-thumbs-down"></i>
              </button>
              <button class="text-gray-500">REPLY</button>
            </div>
            
            <!-- Nested Replies -->
            <div *ngIf="comment.replies?.length" class="ml-8 mt-4 space-y-4">
              <div *ngFor="let reply of comment.replies" class="flex space-x-4">
                <img [src]="reply.userAvatar" class="w-8 h-8 rounded-full" alt="User">
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <span class="font-bold">{{ reply.userName }}</span>
                    <span class="text-gray-500 text-sm">{{ reply.createdAt | date }}</span>
                  </div>
                  <p class="mt-1">{{ reply.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CommentComponent {
  @Input() videoId: string = '';
  comments: Comment[] = [];
  commentCount: number = 0;
  newComment: string = '';
  showCommentActions: boolean = false;
  currentUserAvatar: string = 'https://via.placeholder.com/40';

  addComment(): void {
    if (this.newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        text: this.newComment,
        userName: 'Current User',
        userAvatar: this.currentUserAvatar,
        likes: 0,
        replies: [],
        createdAt: new Date().toISOString()
      };
      this.comments.unshift(comment);
      this.commentCount++;
      this.newComment = '';
      this.showCommentActions = false;
    }
  }
}
