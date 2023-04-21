import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL } from "const/const";
import { User } from "features/users/types";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { currentUserAtom } from "state/currentUser";
import { useSWRConfig } from "swr";

import { deleteComment } from "../api/deleteComment";

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
      const response = await deleteComment({ accessToken, commentId });

      if (response.status === 204) {
        mutate(`${API_BASE_URL}/users/${currentUser?.id}/comments`);

        return response;
      }
    } catch (error) {
      console.error("Error in deleteComment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { destroyComment, isDeleting };
};
