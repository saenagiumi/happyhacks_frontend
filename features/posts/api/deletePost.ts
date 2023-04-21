import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  postId: string | string[] | undefined;
};

export const deletePost = async ({ accessToken, postId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(`${API_BASE_URL}/posts/${postId}`, config);
};
