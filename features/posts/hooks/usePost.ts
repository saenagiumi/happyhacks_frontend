import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL } from "const/const";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { currentUserAtom } from "state/currentUser";
import { useSWRConfig } from "swr";

import { patchComment } from "../api/patchComment";
import { patchHack } from "../api/patchHack";
import { patchPost } from "../api/patchPost";
import { postHack } from "../api/postHack";
import { postPost } from "../api/postPost";

type FormData = {
  title?: string;
  body?: string;
};

type HackFormData = {
  title: string;
  body: string;
  category: string;
  tags: string[];
  tweet_id: string;
};

export const usePost = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const { mutate } = useSWRConfig();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { getAccessTokenSilently } = useAuth0();

  const createPost = async (postInputData: FormData) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();
      const response = await postPost({ accessToken, postInputData });

      if (response.status === 200) {
        mutate(`${API_BASE_URL}/posts`);

        return response.data;
      }
    } catch (error) {
      console.error("Error in postPost:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  const createHack = async (hackInputData: HackFormData) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();
      const response = await postHack({ accessToken, hackInputData });

      if (response.status === 200) {
        mutate(`${API_BASE_URL}/posts`);

        return response.data;
      }
    } catch (error) {
      console.error("Error in postHack:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const updatePost = async (postId: string, postInputData: FormData) => {
    if (isProcessing) {
      return;
    }
    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();
      const response = await patchPost({ accessToken, postId, postInputData });

      if (response.status === 200) {
        if (router.pathname === "/posts/[id]") {
          mutate(`${API_BASE_URL}/posts/${router.query.id}`);
        } else {
          mutate(`${API_BASE_URL}/users/${currentUser.id}/posts`);
        }

        return response.data;
      }
    } catch (error) {
      console.error("Error in patchPost:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateHack = async (hackId: string | undefined, hackInputData: HackFormData) => {
    if (isProcessing) {
      return;
    }
    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();
      const response = await patchHack({ accessToken, hackId, hackInputData });

      if (response.status === 200) {
        if (router.pathname === "/hacks/[id]") {
          mutate(`${API_BASE_URL}/hacks/${router.query.id}`);
        } else {
          mutate(`${API_BASE_URL}/users/${currentUser.id}/hacks`);
        }

        return response.data;
      }
    } catch (error) {
      console.error("Error in patchHack:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateComment = async (
    commentId: string,
    commentInputData: FormData
  ) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();

      const response = await patchComment({
        accessToken,
        commentId,
        commentInputData,
      });

      if (response.status === 200) {
        mutate(`${API_BASE_URL}/users/${currentUser.id}/comments`);

        return response.data;
      }
    } catch (error) {
      console.error("Error in patchComment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return { createHack, createPost, updateComment, updateHack, updatePost };
};
