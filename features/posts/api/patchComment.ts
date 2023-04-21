import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  commentId: string;
  commentInputData: {
    title?: string;
    body?: string;
  };
};

export const patchComment = async ({
  accessToken,
  commentId,
  commentInputData,
}: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.patch(
    `${API_BASE_URL}/comments/${commentId}`,
    { comment: commentInputData },
    config
  );
};
