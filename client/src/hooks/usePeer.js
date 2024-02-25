import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export const usePeer = () => {
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerInitialized = useRef(false);

  useEffect(() => {
    if (!isPeerInitialized.current && !peer) {
      const myPeer = new Peer();
      myPeer.on("open", (id) => {
        console.log(`peer id is ${id}`);
        setMyId(id);
      });
      setPeer(myPeer);
      isPeerInitialized.current = true;
    }

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [peer]);

  return {
    peer,
    myId,
  };
};
