import axios from "axios";
import { User } from "features/users/types";
import { API_BASE_URL } from "const/const";

export const getPostUser = async (postId: string) => {
  try {
    const res = await axios.get<User>(`${API_BASE_URL}/posts/${postId}/user`);
    return res.data;
  } catch (e: any) {
    // エラー発生の状況を特定できていないので、以下は暫定的な対応
    if (e.response.status === 401 || 403) {
      throw new Error("Unauthorized");
    }

    if (e.error === "missing_refresh_token") {
      throw new Error("Missing refresh token");
    }

    let message;
    if (axios.isAxiosError(e) && e.response) {
      console.error(e.response.data.message);
    } else {
      message = String(e);
      console.error(message);
    }
  }
};
