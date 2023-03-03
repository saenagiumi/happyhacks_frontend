import { Comment } from "../types";
import axios from "axios";
import { API_BASE_URL } from "const/const";

interface PostBookmarkArgs {
  commentId: string | string[] | undefined;
  accessToken: string;
}

export const postBookmark = async ({
  commentId,
  accessToken,
}: PostBookmarkArgs) => {
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