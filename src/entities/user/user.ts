export interface UserType {
  avater_url: string;
  bio: string;
  created_at: string;
  email: string;
  followers_count: string;
  following_count: string;
  full_name: string;
  id: number;
  is_following: boolean;
  is_verified: boolean;
  posts_count: string;
  username: string;
}

export interface UserCardType {
  user: UserType;
}
