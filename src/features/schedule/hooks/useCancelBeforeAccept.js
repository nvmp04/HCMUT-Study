import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { fetchAPI } from "../../../utils/fetchAPI";

export function useCancelBeforeAccept(appointment){
    const queryClient = useQueryClient();
    const url = buildAPIUrl(API_ENDPOINTS.SCHEDULE.CANCEL_BEFORE_ACCEPT);
    return useMutation({
        mutationFn: () => fetchAPI(url, 'DELETE', {_id: appointment._id}, true), 
        onSuccess: (()=>{
            queryClient.invalidateQueries(["studentschedule"])
        })
    })
}