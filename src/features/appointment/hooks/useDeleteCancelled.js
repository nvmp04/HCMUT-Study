import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { fetchAPI } from "../../../utils/fetchAPI";
export function useDeleteCancelled(_id){
    const url = buildAPIUrl(API_ENDPOINTS.SCHEDULE.DELETE_CANCELLED);
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn:()=> fetchAPI(url, 'DELETE', {_id}, true), 
        onSuccess: ()=>{
            queryClient.invalidateQueries(['studentschedule'])
        }
    });
}