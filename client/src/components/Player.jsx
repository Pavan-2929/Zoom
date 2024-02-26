import { UserSquare2 } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";

const Player = (props) => {
  const { url, muted, playing, width, height } = props;
  return playing ? (
    <ReactPlayer
      url={url}
      width={width}
      height={height}
      muted={muted}
      playing={playing}
    />
  ) : (
    <UserSquare2 size={460} color="white" />
  );
};

export default Player;
