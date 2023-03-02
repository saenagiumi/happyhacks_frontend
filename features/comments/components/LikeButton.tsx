import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import HeartJson from "public/tw-heart.json";

const LASTFRAME = 89;

type LikeButtonProps = {
  isLiked: boolean;
  likeIsLoading: any;
};

export const LikeButton = ({ isLiked, likeIsLoading }: LikeButtonProps) => {
  const playerRef = useRef<Player>(null);
  const [initialState, setInitialState] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (playerRef.current && !likeIsLoading) {
      // likeが最初からtrueの場合はアニメーション固定
      if (isLiked === true && initialState === null) {
        playerRef.current.setSeeker(LASTFRAME, false);
        setInitialState(true);
      }
      // likeがfalseからtrueになるときにアニメーション開始
      if (isLiked === true && initialState === false) {
        playerRef.current.play();
      }

      // likeがfalsyであればアニメーション静止
      if (isLiked === false) {
        playerRef.current.stop();
        setInitialState(false);
      }
    }
  }, [playerRef.current, isLiked, initialState]);

  useEffect(() => {
    // URLパスに変更があった場合、再レンダリング
    if (!likeIsLoading) {
      // likeがfalsyの場合アニメーションの再生準備
      if (isLiked === false) {
        setInitialState(false);
      }
      if (isLiked === true) {
        setInitialState(null);
      }
    }
  }, [router.asPath, likeIsLoading]);

  return (
    <Player
      ref={playerRef}
      speed={2}
      keepLastFrame
      src={HeartJson}
      style={{ height: "40px", width: "40px" }}
    ></Player>
  );
};
