import { useContext } from "react"
import { SocketContext } from "../context/websocket.context"

export function useSocket(){
    const {socket, setSocket} = useContext(SocketContext);
    return {socket, setSocket}
}