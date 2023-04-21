import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  hackId: string | undefined;
  hackInputData: {
    title: string;
    body: string;
    category: string;
    tags: string[];
    tweet_id: string;
  };
};

export const patchHack = async ({
  accessToken,
  hackId,
  hackInputData,
}: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.patch(
    `${API_BASE_URL}/hacks/${hackId}`,
    { hack: hackInputData },
    config
  );
};
