export interface CommentType {
  id: number;
  content: string;
  created_at: string;
  username: string;
}

export interface CommentTypeWrapp {
  comment: CommentType;
}
