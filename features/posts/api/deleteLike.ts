import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  hackId: string | string[] | undefined;
  likeId: string | undefined;
};

export const deleteLike = async ({ accessToken, hackId, likeId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(
    `${API_BASE_URL}/hacks/${hackId}/likes/${likeId}`,
    config
  );
};
