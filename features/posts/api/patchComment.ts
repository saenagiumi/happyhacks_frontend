import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  commentId: string;
  commentInputData: {
    title: string;
    body: string;
    user_id: string;
  };
  accessToken: string;
};

export const patchComment = async ({
  commentId,
  commentInputData,
  accessToken,
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
