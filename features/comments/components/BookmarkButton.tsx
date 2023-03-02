import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef } from "react";
import BookmarkJson from "public/bookmark.json";

type BookmarkButtonProps = {
  on: boolean;
};

export const BookmarkButton = ({ on }: BookmarkButtonProps) => {
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
      src={BookmarkJson}
      style={{ height: "32px", width: "32px" }}
    ></Player>
  );
};
