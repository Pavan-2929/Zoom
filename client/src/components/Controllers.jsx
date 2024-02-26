import React from "react";
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";
import "./Controllers.css"

const Controllers = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;
  return (
    <div className="controllers-container">
      <div className="controller">
        {muted ? (
          <MicOff onClick={toggleAudio} />
        ) : (
          <Mic onClick={toggleAudio} />
        )}
      </div>
      <div className="controller">
        {playing ? (
          <Video onClick={toggleVideo} />
        ) : (
          <VideoOff onClick={toggleVideo} />
        )}
      </div>
      <div className="controller">
        <PhoneOff onClick={leaveRoom} />
      </div>
    </div>
  );
};

export default Controllers;
