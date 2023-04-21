import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  bookmarkId: string | undefined;
  hackId: string | string[] | undefined;
};

export const deleteBookmark = async ({ accessToken, bookmarkId, hackId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(
    `${API_BASE_URL}/hacks/${hackId}/bookmarks/${bookmarkId}`,
    config
  );
};
