import { Comment } from "../types";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import { useAuth0 } from "@auth0/auth0-react";

interface DeleteBookmarkArgs {
  bookmarkId: string;
  commentId: string | string[] | undefined;
  accessToken: string;
}

export const deleteBookmark = async ({
  bookmarkId,
  commentId,
  accessToken,
}: DeleteBookmarkArgs) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(
    `${API_BASE_URL}/comments/${commentId}/bookmarks/${bookmarkId}`,
    config
  );
};
