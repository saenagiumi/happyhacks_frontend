import { User } from "features/users/types";
import { API_URL } from "utils/const";
import axios from "axios";

export const getUser = async (sub: string | undefined) => {
  if (!sub) {
    throw new Error("subが必要です");
  }
  if (sub) {
    const res = await axios.get<User>(`${API_URL}/users/${sub}`, {
      params: { sub: sub },
    });
    if (res.status !== 200) {
      throw new Error("ユーザーを取得できませんでした。");
    }
    return res.data;
  }
};

export default getUser;
