import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  hackId: string | string[] | undefined;
};

export const deleteHack = async ({ accessToken, hackId }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(`${API_BASE_URL}/hacks/${hackId}`, config);
};
