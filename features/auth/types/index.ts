export type UserPostType = {
  postData: {
    name: string | undefined;
    picture: string | undefined;
    sub: string | undefined;
  };
};

export type UserPostData = {
  name: string;
  picture: string | undefined;
  sub: string | undefined;
}