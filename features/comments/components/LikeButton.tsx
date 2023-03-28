import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import likeHeart from "public/like-heart.json";
import { UnstyledButton } from "@mantine/core";

const LAST_FRAME = 89;

type Props = {
  isLiked: boolean;
  commentLikesIsLoading: boolean;
  likesCount: {
    status: string;
    count: number;
  };
  onClick: () => {};
};

const LikeButton = ({
  isLiked,
  commentLikesIsLoading,
  likesCount,
  onClick,
}: Props) => {
  const playerRef = useRef<Player>(null);
  const [initialState, setInitialState] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (playerRef.current && !commentLikesIsLoading) {
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
    if (!commentLikesIsLoading) {
      // アニメーションの再生準備
      if (isLiked === false) {
        setInitialState(false);
      }
      if (isLiked === true) {
        setInitialState(null);
      }
    }
  }, [router.asPath, commentLikesIsLoading]);

  return (
    <UnstyledButton onClick={onClick}>
      <div className="flex items-center">
        <div
          className={`border-[0.5px] border-solid  ${
            isLiked
              ? "border-rose-300 bg-red-50"
              : "border-gray-100 bg-gray-100"
          }   w-[38px] h-[38px] rounded-full flex justify-center items-center font-bold text-sm text-gray-400 mr-1.5`}
        >
          <div>
            <Player
              ref={playerRef}
              speed={2}
              keepLastFrame
              src={likeHeart}
              style={{ height: "40px", width: "40px" }}
            ></Player>
          </div>
        </div>
        <div className="text-gray-400 font-bold text-sm mr-2 mt-[1px] w-[10px]">
          {likesCount ? likesCount.count : 0}
        </div>
      </div>
    </UnstyledButton>
  );
};

export default LikeButton;
