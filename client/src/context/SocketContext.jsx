import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState(null);

  const connection = useMemo(
    () => io("https://zoom-backend-wmm4.onrender.com"),
    []
  );
  useEffect(() => {
    setSocket(connection);
  }, [connection]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
