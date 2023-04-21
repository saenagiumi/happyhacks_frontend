import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  userInputData: {
    name: string;
    picture: string | undefined;
    userId: string;
  };
};

export const patchUser = async ({ accessToken, userInputData }: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.patch(
    `${API_BASE_URL}/users/${userInputData.userId}`,
    { user: {name: userInputData.name, picture: userInputData.picture} },
    config
  );
};
