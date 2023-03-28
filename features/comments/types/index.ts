export type Comment = {
  id: number;
  title: string;
  body: string;
  post_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type TargetComment = {
  id: string;
  title: string;
  body: string;
};

export type CommentData = {
  user_id: string | undefined;
  post_id: string | string[] | undefined;
  title: string;
  body: string;
};

export type CommentWithUser = {
  id: number;
  post_id: number;
  title: string;
  body: string;
  name: string;
  picture: string;
  created_at: string;
};

export type Like = {
  id: number;
  user_id: number;
  comment_id: number;
  created_at: string;
  updated_at: string;
};

export type Bookmark = {
  id: number;
  user_id: number;
  comment_id: number;
  created_at: string;
  updated_at: string;
};
