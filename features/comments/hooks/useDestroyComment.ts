import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { API_BASE_URL } from "const/const";
import { deleteComment } from "../api/deleteComment";
import { currentUserAtom } from "state/currentUser";
import { useAtomValue } from "jotai";
import { User } from "features/users/types";

export const useDestroyComment = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const currentUser = useAtomValue<User>(currentUserAtom);

  const destroyComment = async (commentId: string) => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      const accessToken = await getAccessTokenSilently();
      const response = await deleteComment({ commentId, accessToken });

      if (response.status === 204) {
        mutate(`${API_BASE_URL}/users/${currentUser?.id}/comments`);

        return response;
      }
    } catch (e: any) {
      // エラー発生の状況を特定できていないので、以下は暫定的な対応
      if (e.response.status === 401 || 403) {
        throw new Error("Unauthorized");
      }

      let message;
      if (axios.isAxiosError(e) && e.response) {
        console.error(e.response.data.message);
      } else {
        message = String(e);
        console.error(message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return { destroyComment, isDeleting };
};
