import React from "react";
import ReactPlayer from "react-player";

const Player = (props) => {
  const { url, muted, playing, width, height } = props;
  return (
      <ReactPlayer
        url={url}
        width={width}
        height={height}
        muted={muted}
        playing={playing}
      />
  );
};

export default Player;
