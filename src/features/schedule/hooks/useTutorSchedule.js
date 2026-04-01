import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";

export function useTutorSchedule(id){
    const url = buildAPIUrl(`${API_ENDPOINTS.SCHEDULE.GET_TUTOR_SCHEDULE}/${id}`);

    const { data: weeklySchedule, isLoading: isScheduleLoading } = useQuery({
        queryKey: ["tutorschedule", id],
        queryFn: () => fetchAPI(url, "GET", null, true),
        enabled: !!id, 
    });
    return {weeklySchedule, isScheduleLoading};
}