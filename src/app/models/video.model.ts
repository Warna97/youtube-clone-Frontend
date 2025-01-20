export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  channelAvatar?: string;
  publishedAt: string;
  viewCount: number;
  likes: number;
  dislikes: number;
  subscriberCount?: number;
  commentCount?: number;
}