import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import React, { useRef } from "react";
import useSWR, { useSWRConfig } from "swr";

import { deleteBookmark } from "../api/deleteBookmark";
import { postBookmark } from "../api/postBookmark";
import { Bookmark } from "../types";

type Props = {
  hackId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

const useToggleHackBookmark = ({ hackId, setShowModal, userId }: Props) => {
  const { data: hackBookmarks, isLoading: bookmarksIsloading } = useSWR(
    `${API_BASE_URL}/hacks/${hackId}/bookmarks`,
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

  const isBookmarked = hackBookmarks?.bookmarks.some(
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

    const bookmarkId = hackBookmarks?.bookmarks.find(
      (bookmark: Bookmark) => bookmark.user_id.toString() == userId
    )?.id;

    try {
      isProcessing.current = true;
      const accessToken = await getAccessTokenSilently();

      if (isBookmarked) {
        await deleteBookmark({
          accessToken: accessToken,
          bookmarkId: bookmarkId?.toString(),
          hackId: hackId,
        });
      } else {
        await postBookmark({
          accessToken: accessToken,
          hackId: hackId,
        });
      }

      mutate(`${API_BASE_URL}/hacks/${hackId}/bookmarks`);
    } catch (error) {
      console.error("Error in mutateBookmark:", error);
    } finally {
      isProcessing.current = false;
    }
  };

  return {
    bookmarksCount: hackBookmarks?.lookmarks_count,
    bookmarksIsloading,
    isBookmarked,
    toggleBookmark,
  };
};

export default useToggleHackBookmark;
