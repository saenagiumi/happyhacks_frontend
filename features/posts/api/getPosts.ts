import { Post } from "features/posts/types";
import { API_BASE_URL } from "const/const";
import axios from "axios";

export const getPosts = async () => {
  const response = await axios.get<Post>(`${API_BASE_URL}/posts/`, {});
  if (response.status !== 200) {
    throw new Error("投稿の取得に失敗しました");
  }
  return response.data;
};

export default getPosts;
