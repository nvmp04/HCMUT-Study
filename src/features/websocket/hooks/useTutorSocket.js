import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { useQueryClient } from "@tanstack/react-query";

export function useTutorSocket(id){
    const queryClient = useQueryClient();
    const {socket} = useSocket();
    useEffect(() => {
        if(!socket) return;
        function handleEvent({tutorId}){
            if(tutorId === id) queryClient.invalidateQueries(['tutorschedule', id]);
        }
        const events = ["appointment-updated", "tutorScheduleUpdated", "decline", "booksession"];
        events.forEach((e)=>socket.on(e, handleEvent))
        return () => {
            events.forEach((e)=>socket.off(e, handleEvent));
        };
    }, [queryClient, socket]);
}