export type User = {
  id: string;
  sub: string;
  name: string;
  picture: string | undefined;
  created_at: string,
  updated_at: string,
};

export type Comment = {
  id: number;
  title: string;
  body: string;
  post_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type UserFormValue = {
  id: string;
  name: string;
  picture: string | undefined;
};

export type UserPostData = {
  sub: string | undefined;
  name: string | undefined;
  picture: string | undefined;
}