import { Player } from "@lottiefiles/react-lottie-player";
import { UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import BookmarkJson from "public/bookmark.json";
import { useEffect, useRef, useState } from "react";

type Props = {
  bookmarksIsLoading: boolean;
  isBookmarked: boolean;
  onClick: () => {};
};

const BookmarkButton = ({
  bookmarksIsLoading,
  isBookmarked,
  onClick,
}: Props) => {
  const playerRef = useRef<Player>(null);
  const [initialState, setInitialState] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (playerRef.current && !bookmarksIsLoading) {
      // 最初からtrueの場合はアニメーション静止
      if (isBookmarked === true && initialState === null) {
        playerRef.current.setSeeker(50, false);
        setInitialState(true);
      }
      // falseからtrueになるときにアニメーション再生
      if (isBookmarked === true && initialState === false) {
        playerRef.current.play();
      }

      // falseであればアニメーション静止
      if (isBookmarked === false) {
        playerRef.current.stop();
        setInitialState(false);
      }
    }
  }, [playerRef.current, isBookmarked, initialState]);

  useEffect(() => {
    // URLに変更があった場合、再レンダリング
    if (!bookmarksIsLoading) {
      // アニメーションの再生準備
      if (isBookmarked === false) {
        setInitialState(false);
      }
      if (isBookmarked === true) {
        setInitialState(null);
      }
    }
  }, [router.asPath, bookmarksIsLoading]);

  return (
    <UnstyledButton onClick={onClick}>
      <div className="flex justify-center items-center font-bold text-sm text-gray-800">
        <div
          className={`border-[1px] border-solid pt-[1px] w-[38px] h-[37.5px] ${
            isBookmarked
              ? " border-amber-300 bg-amber-50"
              : "border-gray-100 bg-gray-100"
          } rounded-full flex justify-center items-center font-bold text-sm text-gray-400`}
        >
          <Player
            ref={playerRef}
            speed={2.8}
            keepLastFrame
            src={BookmarkJson}
            style={{ height: "26px", width: "26px" }}
          ></Player>
        </div>
      </div>
    </UnstyledButton>
  );
};

export default BookmarkButton;
