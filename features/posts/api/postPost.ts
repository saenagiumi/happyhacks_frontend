import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  postInputData: {
    title?: string;
    body?: string;
  };
};

export const postPost = async ({ accessToken, postInputData }: Props) => {
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
