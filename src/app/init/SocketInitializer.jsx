import { useAuth } from "../../features/auth/hooks/useAuth";
import { useSocket } from "../../features/websocket/hooks/useSocket";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { API_BASE_URL } from "../../config/api.config";
export function SocketInitializer({children}){
    const {auth} = useAuth();
    const {setSocket} = useSocket();
    useEffect(() => {
        if (!auth.token) {
            setSocket(null);
            return;
        }
        const newSocket = io(API_BASE_URL, {
            auth: { token: auth.token },
            reconnection: true,
            reconnectionDelay: 1000
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [auth?.token]);
    return children;
}