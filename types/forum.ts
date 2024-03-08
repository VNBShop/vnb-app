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
