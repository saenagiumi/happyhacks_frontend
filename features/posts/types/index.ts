export type PostType = {
  id: number;
  title: string;
  body: string;
  name: string;
  user_id: string;
  picture: string;
  created_at: string;
};

export type PostWithCommentsCountType = {
  id: number;
  title: string;
  body: string;
  name: string;
  user_id: number;
  picture: string;
  created_at: string;
  comments_count: number;
};


export type TargetPost = {
  id: string;
  title: string;
  body: string;
};
