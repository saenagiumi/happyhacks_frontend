import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef, useState } from "react";
import BookmarkJson from "public/bookmark.json";
import { useRouter } from "next/router";

type BookmarkButtonProps = {
  isBookmarked: boolean;
  bookmarkIsLoading: any;
};

export const BookmarkButton = ({ isBookmarked, bookmarkIsLoading }: BookmarkButtonProps) => {
  const playerRef = useRef<Player>(null);
  const [initialState, setInitialState] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (playerRef.current && !bookmarkIsLoading) {
      // likeが最初からtrueの場合はアニメーション固定
      if (isBookmarked === true && initialState === null) {
        playerRef.current.setSeeker(50, false);
        setInitialState(true);
      }
      // likeがfalseからtrueになるときにアニメーション開始
      if (isBookmarked === true && initialState === false) {
        playerRef.current.play();
      }

      // likeがfalsyであればアニメーション静止
      if (isBookmarked === false) {
        playerRef.current.stop();
        setInitialState(false);
      }
    }
  }, [playerRef.current, isBookmarked, initialState]);

  useEffect(() => {
    // URLパスに変更があった場合、再レンダリング
    if (!bookmarkIsLoading) {
      // likeがfalsyの場合アニメーションの再生準備
      if (isBookmarked === false) {
        setInitialState(false);
      }
      if (isBookmarked === true) {
        setInitialState(null);
      }
    }
  }, [router.asPath, bookmarkIsLoading]);

  return (
    <Player
      ref={playerRef}
      speed={2}
      keepLastFrame
      src={BookmarkJson}
      style={{ height: "32px", width: "32px" }}
    ></Player>
  );
};
