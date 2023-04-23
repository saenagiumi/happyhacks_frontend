export type Comment = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  post_id: number;
  updated_at: string;
  user_id: number;
};

export type TargetComment = {
  id: string;
  title: string;
  body: string;
};

export type CommentData = {
  title: string;
  body: string;
  post_id: string | string[] | undefined;
  user_id: string | undefined;
};

export type CommentReturnType = {
  id: number;
  name: string;
  title: string;
  body: string;
  created_at: string;
  picture: string;
  post_id: number;
};

export type Like = {
  id: number;
  comment_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
};

export type Bookmark = {
  id: number;
  comment_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
};
