import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { fetchAPI } from "../../../utils/fetchAPI";
export function useDeleteHistory(_id){
    const url = buildAPIUrl(API_ENDPOINTS.APPOINTMENT.DELETE_HISTORY);
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn:()=> fetchAPI(url, 'PUT', {_id}, true), 
        onSuccess: ()=>{
            queryClient.invalidateQueries(['studentschedule'])
        }
    });
}