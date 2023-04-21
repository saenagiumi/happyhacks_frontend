export type PostType = {
  id: number;
  name: string;
  title: string;
  body: string;
  created_at: string;
  picture: string;
  user_id: string;
};

export type PostReturnType = {
  id: string;
  name: string;
  title: string;
  body: string;
  comments_count: number;
  created_at: string;
  picture: string;
  updated_at: string;
  user_id: number;
};

export type Hack = {
  id: number;
  name: string;
  title: string;
  body: string;
  bookmarks_count: number;
  category: string;
  created_at: string;
  picture: string;
  tags: string[];
  tweet_id: string;
  user_id: number;
};

export type HackFormData = {
  id?: string
  title: string;
  body: string;
  category: string;
  tags: string[];
  tweet_id: string;
};

export type TargetPost = {
  id: string;
  title: string;
  body: string;
};

export type TargetHack = {
  id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  tweet_id: string;
};

export type Like = {
  id: string | undefined
  created_at: string;
  hack_id: number;
  updated_at: string;
  user_id: number;
};

export type Bookmark = {
  id: number;
  created_at: string;
  hack_id: number;
  updated_at: string;
  user_id: number;
};