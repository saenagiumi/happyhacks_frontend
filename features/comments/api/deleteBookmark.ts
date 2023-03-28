import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  bookmarkId: string;
  commentId: string | string[] | undefined;
  accessToken: string;
};

export const deleteBookmark = async ({
  bookmarkId,
  commentId,
  accessToken,
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
