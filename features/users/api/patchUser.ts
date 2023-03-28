import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  userInputData: {
    userId: string;
    name: string;
    picture: string | undefined;
  };
  accessToken: string;
};

export const patchUser = async ({ userInputData, accessToken }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.patch(
    `${API_BASE_URL}/users/${userInputData.userId}`,
    { user: userInputData },
    config
  );
};
