import { useMutation, useQueryClient } from "@tanstack/react-query";
import studentBooking from "../services/schedule.service";
import { useAuth } from "../../auth/hooks/useAuth";


export function useBooking(){
    const queryClient = useQueryClient();
    const {token} = useAuth();
    return useMutation({
        mutationFn: ({tutor, selectedTimeSlot, sessionTitle}) =>{
            return studentBooking(tutor, selectedTimeSlot, sessionTitle);
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['tutorschedule']});
            queryClient.invalidateQueries({queryKey: ['studentschedule', token]})
        }
    });
}