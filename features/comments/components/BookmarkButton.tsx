import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef, useState } from "react";
import BookmarkJson from "public/bookmark.json";
import { useRouter } from "next/router";
import { UnstyledButton } from "@mantine/core";

type Props = {
  isBookmarked: boolean;
  commentBookmarksIsLoading: boolean;
  onClick: () => {};
};

const BookmarkButton = ({
  isBookmarked,
  commentBookmarksIsLoading,
  onClick,
}: Props) => {
  const playerRef = useRef<Player>(null);
  const [initialState, setInitialState] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (playerRef.current && !commentBookmarksIsLoading) {
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
    if (!commentBookmarksIsLoading) {
      // アニメーションの再生準備
      if (isBookmarked === false) {
        setInitialState(false);
      }
      if (isBookmarked === true) {
        setInitialState(null);
      }
    }
  }, [router.asPath, commentBookmarksIsLoading]);

  return (
    <UnstyledButton onClick={onClick}>
      <div className="flex justify-center items-center font-bold text-sm text-gray-800">
        <div
          className={`border-[0.5px] border-solid pt-[2px]  ${
            isBookmarked
              ? " border-main-green bg-green-50"
              : "border-gray-100 bg-gray-100"
          }   w-[38px] h-[38px] rounded-full flex justify-center items-center font-bold text-sm text-gray-400`}
        >
          <Player
            ref={playerRef}
            speed={2}
            keepLastFrame
            src={BookmarkJson}
            style={{ height: "32px", width: "32px" }}
          ></Player>
        </div>
      </div>
    </UnstyledButton>
  );
};

export default BookmarkButton;
