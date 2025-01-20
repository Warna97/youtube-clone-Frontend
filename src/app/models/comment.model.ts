export interface Comment {
    id: string;
    text: string;
    userName: string;
    userAvatar: string;
    likes: number;
    replies: Comment[];
    createdAt: string;
  }