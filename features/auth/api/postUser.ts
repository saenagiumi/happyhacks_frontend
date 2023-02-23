import { User, UserPostData } from "features/users/types";
import { API_URL } from "utils/const";
import axios from "axios";

export const postUser = async (
  postUserData: UserPostData,
  config: {
    headers: {
      Authorization: string;
    };
  }
) => {
  const response = await axios.post(
    `${API_URL}/users`,
    { user: postUserData },
    config
  );
  if (response.status !== 200) {
    throw new Error("ユーザーの登録に失敗しました");
  }

  return response.data;
};

export default postUser;
