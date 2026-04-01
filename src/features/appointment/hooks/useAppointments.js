import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useAuth } from "../../auth/hooks/useAuth";

export function useAppointments(){
    const {token} = useAuth();
    const url = buildAPIUrl(API_ENDPOINTS.APPOINTMENT.GET_APPOINTMENT);
    return useQuery({
            queryKey: ['studentschedule', token], 
            queryFn: () => fetchAPI(url, 'GET', null, true)
        })
}