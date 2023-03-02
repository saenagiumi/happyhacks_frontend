export type User = {
  id: string;
  sub: string;
  name: string;
  email: string;
  picture: string;
  created_at: string,
  updated_at: string,
};

export type UserPostData = {
  sub: string;
  name: string;
  email: string;
  picture: string;
}