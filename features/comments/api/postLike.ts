import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  commentId: string | string[] | undefined;
};

export const postLike = async ({ accessToken, commentId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.post(
    `${API_BASE_URL}/comments/${commentId}/likes`,
    {
      params: commentId,
    },
    config
  );
};
