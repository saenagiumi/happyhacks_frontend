import { API_BASE_URL } from "const/const";
import axios from "axios";
import { UserPostData } from "features/users/types";

type Props = {
  postUserData: UserPostData;
  accessToken: string;
};

export const postUser = async ({ postUserData, accessToken }: Props) => {
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
