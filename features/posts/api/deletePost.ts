import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  postId: string | string[] | undefined;
  accessToken: string;
};

export const deletePost = async ({ postId, accessToken }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(`${API_BASE_URL}/posts/${postId}`, config);
};
