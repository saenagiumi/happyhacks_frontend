import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  commentId: string | string[] | undefined;
};

export const deleteComment = async ({ accessToken, commentId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(`${API_BASE_URL}/comments/${commentId}`, config);
};
