import axios from "axios";
import { API_BASE_URL } from "const/const";
import { UserPostData } from "features/users/types";

type Props = {
  accessToken: string;
  postUserData: UserPostData;
};

export const postUser = async ({ accessToken, postUserData }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.post(
    `${API_BASE_URL}/users`,
    { user: postUserData },
    config
  );
};
