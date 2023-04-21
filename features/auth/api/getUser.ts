import axios from "axios";
import { API_BASE_URL } from "const/const";
import { User } from "features/users/types";

type Props = {
  accessToken: string;
  sub: string | undefined;
};

export const getUser = async ({accessToken, sub}: Props) => {
  if (!sub) {
    throw new Error("subが必要です");
  }
  if (sub !== undefined && accessToken !== undefined) {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        sub: sub,
      },
    };
    const res = await axios.get<User>(`${API_BASE_URL}/users/${sub}`, config);
    if (res.status !== 200) {
      throw new Error("ユーザーを取得できませんでした。");
    }
    return res.data;
  }
};

export default getUser;
