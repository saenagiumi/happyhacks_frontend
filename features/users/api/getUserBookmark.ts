import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  user_id: string;
};

export const getUserBookmark = async ({ accessToken, user_id }: Props) => {
  if (accessToken !== undefined) {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        user_id,
      },
    };
    const res = await axios.get(
      `${API_BASE_URL}/users/${user_id}/bookmarks`,
      config
    );
    if (res.status !== 200) {
      throw new Error("ブックマークを取得できませんでした。");
    }
    return res.data;
  }
};

export default getUserBookmark;
