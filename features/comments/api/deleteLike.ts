import { Comment } from "../types";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import { useAuth0 } from "@auth0/auth0-react";

interface DeleteLikeArgs {
  likeId: string;
  commentId: string | string[] | undefined;
  accessToken: string;
}

export const deleteLike = async ({
  likeId,
  commentId,
  accessToken,
}: DeleteLikeArgs) => {
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  return await axios.delete(
    `${API_BASE_URL}/comments/${commentId}/likes/${likeId}`,
    config
  );
};
