import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import React, { useRef } from "react";
import useSWR, { useSWRConfig } from "swr";

import { deleteBookmark } from "../api/deleteBookmark";
import { postBookmark } from "../api/postBookmark";
import { Bookmark } from "../types";

type Props = {
  commentId: string | string[] | undefined;
  postId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

const useToggleBookmark = ({
  commentId,
  postId,
  setShowModal,
  userId,
}: Props) => {
  const { data: commentBookmarks, isLoading: bookmarksIsLoading } = useSWR(
    `${API_BASE_URL}/posts/${postId}/comments/${commentId}/bookmarks`,
    async (url: string) => {
      const accessToken = await getAccessTokenSilently();
      const config = {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await axios.get(url, config);
      return res.data;
    }
  );
  const { getAccessTokenSilently, isLoading, user } = useAuth0();

  const isProcessing = useRef(false);
  const { mutate } = useSWRConfig();

  const isBookmarked = commentBookmarks?.bookmarks.some(
    (bookmark: Bookmark) => bookmark.user_id.toString() === userId.toString()
  );

  const toggleBookmark = async () => {
    if (user === undefined && !isLoading) {
      setShowModal(true);
      return;
    }

    if (isProcessing.current) {
      return;
    }

    const bookmarkId = commentBookmarks?.bookmarks.find(
      (bookmark: Bookmark) => bookmark.user_id.toString() == userId
    )?.id;

    try {
      isProcessing.current = true;
      const accessToken = await getAccessTokenSilently();

      if (isBookmarked) {
        await deleteBookmark({
          accessToken: accessToken,
          bookmarkId: bookmarkId,
          commentId: commentId,
        });
      } else {
        await postBookmark({
          accessToken: accessToken,
          commentId: commentId,
        });
      }

      mutate(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/bookmarks`);
    } catch (error) {
      console.error("Error in mutateBookmark:", error);
    } finally {
      isProcessing.current = false;
    }
  };

  return {
    bookmarksIsLoading,
    isBookmarked,
    toggleBookmark,
  };
};

export default useToggleBookmark;
