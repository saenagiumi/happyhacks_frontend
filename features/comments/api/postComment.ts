import axios from "axios";
import { API_BASE_URL } from "const/const";

import { CommentData } from "../types";

type Props = {
  accessToken: string;
  commentInputData: CommentData;
  postId: string | string[] | undefined;
};

export const postComment = async ({ accessToken, commentInputData, postId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.post(
    `${API_BASE_URL}/posts/${postId}/comments`,
    {
      comment: commentInputData,
    },
    config
  );
};