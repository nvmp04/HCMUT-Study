import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelBeforeAccept } from "../../schedule/services/schedule.service";

export function useCancelBeforeAccept(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (appointment) => CancelBeforeAccept(appointment), 
        onSuccess: (()=>{
            queryClient.invalidateQueries(["studentschedule"])
        })
    })
}