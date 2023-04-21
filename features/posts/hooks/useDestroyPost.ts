import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL } from "const/const";
import { User } from "features/users/types";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { currentUserAtom } from "state/currentUser";
import { useSWRConfig } from "swr";

import { deleteHack } from "../api/deleteHack";
import { deletePost } from "../api/deletePost";

export const useDestroyPost = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const currentUser = useAtomValue<User>(currentUserAtom);

  const destroyPost = async (postId: string | string[] | undefined) => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      const accessToken = await getAccessTokenSilently();
      const response = await deletePost({ accessToken, postId });

      if (response.status === 204) {
        mutate(`${API_BASE_URL}/users/${currentUser.id}/posts`);

        return response;
      }
    } catch (error) {
      console.error("Error in deletePost:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const destroyHack = async (hackId: string | string[] | undefined) => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      const accessToken = await getAccessTokenSilently();
      const response = await deleteHack({ accessToken, hackId });

      if (response.status === 204) {
        mutate(`${API_BASE_URL}/users/${currentUser.id}/hacks`);

        return response;
      }
    } catch (error) {
      console.error("Error in deleteHack:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { destroyHack, destroyPost, isDeleting };
};
