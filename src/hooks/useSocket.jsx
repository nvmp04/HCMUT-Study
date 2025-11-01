import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./useAuth";
const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const {auth} = useAuth();

  useEffect(() => {
    if (!auth.token) {
      if(socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }
    const newSocket = io("https://hcmut-study-backend.onrender.com", {
      auth: { token: auth.token },
      reconnection: true,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [auth.token]);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
