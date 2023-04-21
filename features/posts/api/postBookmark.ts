import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  hackId: string | string[] | undefined;
};

export const postBookmark = async ({ accessToken, hackId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.post(
    `${API_BASE_URL}/hacks/${hackId}/bookmarks`,
    {
      params: hackId,
    },
    config
  );
};
