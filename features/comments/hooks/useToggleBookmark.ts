import { useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR, { useSWRConfig } from "swr";
import { postBookmark } from "../api/postBookmark";
import { deleteBookmark } from "../api/deleteBookmark";
import { Bookmark } from "../types";

type Props = {
  userId: string;
  postId: string;
  commentId: string | string[] | undefined;
};

const useToggleBookmark = ({ postId, commentId, userId }: Props) => {
  const { data: commentBookmarks, isLoading: commentBookmarksIsLoading } =
    useSWR(
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
  const { user, isLoading, getAccessTokenSilently, loginWithPopup } =
    useAuth0();

  const isProcessing = useRef(false);
  const { mutate } = useSWRConfig();

  const isBookmarked = commentBookmarks?.bookmarks.some(
    (bookmark: Bookmark) => bookmark.user_id.toString() == userId
  );

  const toggleBookmark = async () => {
    if (user === undefined && !isLoading) {
      loginWithPopup();
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

      mutate(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/bookmarks`);
    } catch (e: any) {
      // エラー発生の状況を特定できていないので、以下は暫定的な対応
      if (e.response.status === 401 || 403) {
        throw new Error("Unauthorized");
      }

      if (e.error === "missing_refresh_token") {
        throw new Error("Missing refresh token");
      }

      let message;
      if (axios.isAxiosError(e) && e.response) {
        console.error(e.response.data.message);
      } else {
        message = String(e);
        console.error(message);
      }
    } finally {
      isProcessing.current = false;
    }
  };

  return {
    isBookmarked,
    commentBookmarksIsLoading,
    toggleBookmark,
  };
};

export default useToggleBookmark;
