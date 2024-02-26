import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { usePeer } from "../hooks/usePeer";
import useMediaStream from "../hooks/useMediaStream";
import usePlayer from "../hooks/usePlayer";
import Player from "../components/Player";
import { useParams } from "react-router-dom";
import Controllers from "../components/Controllers";
import { cloneDeep } from "lodash";
import "./Room.css";

function Room() {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const { roomId } = useParams();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);
  const [users, setUsers] = useState([]);
  const [copied, setCopied] = useState(false);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleUserConnected = (newUser) => {
      console.log(`user connected in room with ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);

        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };

    socket?.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, setPlayers]);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);

        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;

    console.log(`setting my stream ${myId}`);

    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [stream, myId, setPlayers]);

  useEffect(() => {
    const handleToggleAudio = (userId) => {
      console.log(`user with id ${userId} toggled Audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      console.log(`user ${userId}is leavig`);
      users[userId]?.close();
    };
    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, []);

  return (
    <>
      <div className="room-container">
        <div className="player-container">
          <h1>Clients room</h1>
          {Object.keys(nonHighlightedPlayers).map((playerId, index) => {
            const { url, muted, playing } = nonHighlightedPlayers[playerId];
            return (
              <Player
                key={index}
                className="player"
                url={url}
                muted={muted}
                playing={playing}
                width="100%"
                height="100%"
              />
            );
          })}
        </div>
        <div className="player-container">
          <h1>Your room</h1>
          {playerHighlighted && (
            <Player
              className="player"
              url={playerHighlighted.url}
              muted={playerHighlighted.muted}
              playing={playerHighlighted.playing}
              width="100%"
              height="100%"
            />
          )}
          <div className="copy-div">
            <button onClick={copyRoomId}>
              {copied ? "Copied!" : "Copy Room ID"}
            </button>
          </div>
        </div>
        <Controllers
          muted={playerHighlighted?.muted}
          playing={playerHighlighted?.playing}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          leaveRoom={leaveRoom}
        />
      </div>
    </>
  );
}

export default Room;
