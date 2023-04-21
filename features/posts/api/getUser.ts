import axios from "axios";
import { API_BASE_URL } from "const/const";
import { User } from "features/users/types";

export const getPostUser = async (postId: string) => {
  try {
    const res = await axios.get<User>(`${API_BASE_URL}/posts/${postId}/user`);
    return res.data;
  } catch (error) {
    console.error("Error in getPostUser:", error);
  }
};
