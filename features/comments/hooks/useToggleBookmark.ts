import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import { useAuth0 } from "@auth0/auth0-react";
import { Comment } from "../types";
import useSWR, { useSWRConfig } from "swr";
import { postBookmark } from "../api/postBookmark";
import { deleteBookmark } from "../api/deleteBookmark";

interface useToggleBookmarkArgs {
  commentId: string | string[] | undefined;
  userId: string;
}

const useToggleBookmark = ({ commentId, userId }: useToggleBookmarkArgs) => {
  const { getAccessTokenSilently } = useAuth0();
  const { mutate } = useSWRConfig();

  const {
    data: bookmarksData,
    error: bookmarkError,
    isLoading: bookmarkIsLoading,
  } = useSWR(
    `${API_BASE_URL}/comments/${commentId}/bookmarks`,
    async (url: string) => {
      const res = await axios.get(url);
      return res.data;
    }
  );

  console.log({bookmarksData});
  

  const isBookmarked = bookmarksData?.bookmarks?.some(
    (bookmark: any) => bookmark.user_id == userId
  );

  // いいねのトグル関数
  const toggleBookmarks = async () => {
    const accessToken = await getAccessTokenSilently();
    const bookmarkId = bookmarksData?.bookmarks?.find(
      (bookmark: any) => bookmark.user_id == userId
    )?.id;
    try {
      if (isBookmarked) {
        await deleteBookmark({
          bookmarkId: bookmarkId,
          commentId: commentId,
          accessToken: accessToken,
        });
      } else {
        await postBookmark({
          commentId: commentId,
          accessToken: accessToken,
        });
      }
      mutate(`${API_BASE_URL}/comments/${commentId}/bookmarks`);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isBookmarked,
    bookmarksData,
    bookmarkError,
    bookmarkIsLoading,
    toggleBookmarks,
  };
};

export default useToggleBookmark;
