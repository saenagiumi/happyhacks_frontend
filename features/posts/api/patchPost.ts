import axios from "axios";
import { API_BASE_URL } from "const/const";

type Props = {
  accessToken: string;
  postId: string;
  postInputData: {
    title?: string;
    body?: string;
  };
};

export const patchPost = async ({
  accessToken,
  postId,
  postInputData,
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
