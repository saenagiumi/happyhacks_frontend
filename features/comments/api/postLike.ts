import { Comment } from "../types";
import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  commentId: string | string[] | undefined;
  accessToken: string;
};

export const postLike = async ({ commentId, accessToken }: Props) => {
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
