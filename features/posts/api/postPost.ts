import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  postInputData: {
    title: string;
    body: string;
    user_id: string;
  };
  accessToken: string;
};

export const postPost = async ({ postInputData, accessToken }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.post(
    `${API_BASE_URL}/posts`,
    { post: postInputData },
    config
  );
};
