import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  postId: string;
  postInputData: {
    title: string;
    body: string;
    user_id: string;
  };
  accessToken: string;
};

export const patchPost = async ({
  postId,
  postInputData,
  accessToken,
}: Props) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.patch(
    `${API_BASE_URL}/posts/${postId}`,
    { post: postInputData },
    config
  );
};
