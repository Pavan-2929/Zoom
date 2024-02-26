import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSocket } from "../context/SocketContext";
import { useParams } from "react-router-dom";

export const usePeer = () => {
  const socket = useSocket();
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerInitialized = useRef(false);
  const { roomId } = useParams();

  useEffect(() => {
    if (!isPeerInitialized.current && !peer) {
      const myPeer = new Peer();
      myPeer.on("open", (id) => {
        console.log(`peer id is ${id}`);
        setMyId(id);

        socket?.emit("join-room", roomId, id);
      });
      setPeer(myPeer);
      isPeerInitialized.current = true;
    }

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [peer, socket, roomId]);

  return {
    peer,
    myId,
  };
};
