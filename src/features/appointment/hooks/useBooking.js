import { useMutation, useQueryClient } from "@tanstack/react-query";
import {studentBooking} from "../../schedule/services/schedule.service";
import { useAuth } from "../../auth/hooks/useAuth";
import { useProfile} from "../../profile/hooks/useProfile"

export function useBooking(){
    const queryClient = useQueryClient();
    const {token} = useAuth();
    const {data: profile} = useProfile();
    return useMutation({
        mutationFn: ({tutor, selectedTimeSlot, sessionTitle}) =>{
            return studentBooking(profile, tutor, selectedTimeSlot, sessionTitle);
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['tutorschedule']});
            queryClient.invalidateQueries({queryKey: ['studentschedule', token]})
        }, 
        
    });
}