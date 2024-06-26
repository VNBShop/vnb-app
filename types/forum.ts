export type Post = {
  postId: number;
  postContent: string;
  postAuthorName: string;
  postAuthorAvatar: string;
  postImages: string[];
  postTags: string[];
  createdAt: Date;
  totalReaction: number;
  totalComment: number;
  reacted: boolean;
  yourPost: boolean;
  saved: boolean;
  reported: boolean;
  postAuthorId: number;
};

export type Comment = {
  commentId: number;
  commentatorId: number;
  commentatorName: string;
  commentatorAvatar: string;
  commentContent: string;
  createdAt: Date;
  yourComment: boolean;
};

export type Notification = {
  notificationId: number;
  actorName: string;
  content: string;
  postId: Post['postId'];
  isRead: boolean;
  actorAvatar: string;
};

export type SocketProps<T> = {
  type: 'NOTIFICATION' | 'CHAT' | 'CHAT_LIST';
  data: T;
};
