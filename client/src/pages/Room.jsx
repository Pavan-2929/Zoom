import { useEffect } from "react";
import { useSocket } from "../context/SocketContext"
import { usePeer } from "../hooks/usePeer";

function Room() {
  const socket = useSocket();
  const { peer, myId } = usePeer();

  console.log("Peer id is", myId);
  console.log("Peer is", peer);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket.id);
    });
  }, [socket]);

  return <>Hi there</>;
}

export default Room;
