import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  commentId: string | string[] | undefined;
};

export const postBookmark = async ({ accessToken, commentId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.post(
    `${API_BASE_URL}/comments/${commentId}/bookmarks`,
    {
      params: commentId,
    },
    config
  );
};
