import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  likeId: string;
  commentId: string | string[] | undefined;
  accessToken: string;
};

export const deleteLike = async ({ likeId, commentId, accessToken }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(
    `${API_BASE_URL}/comments/${commentId}/likes/${likeId}`,
    config
  );
};
