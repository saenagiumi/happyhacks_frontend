import { CommentData } from "../types";
import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  postId: string | string[] | undefined;
  accessToken: string;
  commentInputData: CommentData;
};

export const postComment = async ({ postId, accessToken, commentInputData }: Props) => {
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