export interface Post {
  likes_count: number;
  comments_count: number;
  caption: string;
  created_at: number;
  key: number;
  id: number;
  image_url: string;
  username: string;
}

export interface PostProps {
  post: Post;
}
