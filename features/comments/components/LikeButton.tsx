import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef } from "react";
import HeartJson from "public/tw-heart.json";

type LikeButtonProps = {
  on: boolean;
};

export const LikeButton = ({ on }: LikeButtonProps) => {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    if (!playerRef.current) return;
    on ? playerRef.current.play() : playerRef.current.stop();
  }, [on]);

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
