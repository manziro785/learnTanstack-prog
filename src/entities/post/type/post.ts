export interface PostType {
  likes_count: number;
  comments_count: number;
  caption: string;
  created_at: string;
  key: number;
  id: number;
  image_url: string;
  username: string;
  user_id: number;
  hashtags: string;
  is_liked: boolean;
  is_saved: boolean;
  preview_image?: string;
  tag?: string;
  posts_count?: number;
}

export interface PostProps {
  post: PostType;
}
