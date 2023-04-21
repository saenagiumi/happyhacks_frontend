export type User = {
  id: string;
  name: string;
  created_at: string;
  picture: string | undefined;
  sub: string,
  updated_at: string,
};

export type Comment = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  post_id: number;
  updated_at: string;
  user_id: number;
};

export type UserFormValue = {
  id: string;
  name: string;
  picture: string | undefined;
};

export type UserPostData = {
  name: string;
  picture: string | undefined;
}