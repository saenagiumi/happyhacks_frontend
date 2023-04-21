import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  bookmarkId: string;
  commentId: string | string[] | undefined;
};

export const deleteBookmark = async ({
  accessToken,
  bookmarkId,
  commentId,
}: Props) => {
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
