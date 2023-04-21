import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  hackInputData: {
    title: string;
    body: string;
    category: string;
    tags: string[];
    tweet_id: string;
  };
};

export const postHack = async ({ accessToken, hackInputData }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.post(
    `${API_BASE_URL}/hacks`,
    { hack: hackInputData },
    config
  );
};
