import { Player } from "@lottiefiles/react-lottie-player";
import { UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import likeHeart from "public/like-heart.json";
import { useEffect, useRef, useState } from "react";

const LAST_FRAME = 89;

type Props = {
  isLiked: boolean;
  likesCount: {
    count: number;
    status: string;
  } | null;
  likesIsLoading: boolean;
  onClick: () => {};
};

const LikeButton = ({
  isLiked,
  likesCount,
  likesIsLoading,
  onClick,
}: Props) => {
  const playerRef = useRef<Player>(null);
  const [initialState, setInitialState] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (playerRef.current && !likesIsLoading) {
      // 最初からtrueの場合はアニメーション静止
      if (isLiked === true && initialState === null) {
        playerRef.current.setSeeker(LAST_FRAME, false);
        setInitialState(true);
      }
      // falseからtrueになるときにアニメーション再生
      if (isLiked === true && initialState === false) {
        playerRef.current.play();
      }

      // アニメーション静止
      if (isLiked === false) {
        playerRef.current.stop();
        setInitialState(false);
      }
    }
  }, [playerRef.current, isLiked, initialState]);

  useEffect(() => {
    // URLに変更があった場合、再レンダリング
    if (!likesIsLoading) {
      // アニメーションの再生準備
      if (isLiked === false) {
        setInitialState(false);
      }
      if (isLiked === true) {
        setInitialState(null);
      }
    }
  }, [router.asPath, likesIsLoading]);

  return (
    <UnstyledButton onClick={onClick}>
      <div className="flex items-center">
        <div
          className={`border-[1px] border-solid w-[38px] h-[37.5px]  ${
            isLiked
              ? "border-rose-200 bg-red-50"
              : "border-gray-100 bg-gray-100"
          }    rounded-full flex justify-center items-center font-bold text-sm text-gray-400 ${
            likesCount !== null ? "mr-1.5" : ""
          }`}
        >
          <div>
            <Player
              ref={playerRef}
              speed={1.5}
              keepLastFrame
              src={likeHeart}
              style={{ height: "40px", width: "40px" }}
            ></Player>
          </div>
        </div>
        {likesCount !== null && (
          <div className="text-gray-400 font-bold text-sm mr-2 mt-[1px] w-[10px]">
            {likesCount ? likesCount.count : 0}
          </div>
        )}
      </div>
    </UnstyledButton>
  );
};

export default LikeButton;
