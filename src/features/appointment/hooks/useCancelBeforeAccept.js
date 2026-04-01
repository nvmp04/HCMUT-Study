import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { CancelBeforeAccept } from "../../schedule/services/schedule.service";

export function useCancelBeforeAccept(){
    const queryClient = useQueryClient();
    const url = buildAPIUrl(API_ENDPOINTS.SCHEDULE.CANCEL_BEFORE_ACCEPT);
    return useMutation({
        mutationFn: (appointment) => CancelBeforeAccept(appointment), 
        onSuccess: (()=>{
            queryClient.invalidateQueries(["studentschedule"])
        })
    })
}