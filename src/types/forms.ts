export interface EmailPasswordForm {
  email: string;
  password: string;
}

export interface CommentForm {
  reviewId: number;
  parentCommentId?: number;
  content: string;
}
