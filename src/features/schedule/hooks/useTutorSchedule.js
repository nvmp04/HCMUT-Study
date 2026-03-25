import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useMemo } from "react";

export function useTutorSchedule(id){
    const url = buildAPIUrl(API_ENDPOINTS.SCHEDULE.GET_TUTOR_SCHEDULE);
    const {data} = useQuery({
        queryKey: ["tutorschedule", id],
        queryFn: () => fetchAPI(url, "POST", { id }, true)
      });
      const weeklySchedule = useMemo(() => {
        if (!data) return [];
        const today = new Date();
        const weekdayMap = {
        0: "sun",
        1: "mon",
        2: "tues",
        3: "wed",
        4: "thur",
        5: "fri",
        6: "sat",
        };
    
        return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const weekday = date.getDay();
        const scheduleKey = weekdayMap[weekday];
        const slotsFromAPI = data?.schedule?.[scheduleKey] || [];
        const dayformat = date.toLocaleDateString("vi-VN", { weekday: "long" });
        const dateformat = date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    
        return {
            day: dayformat,
            date: dateformat,
            timeSlots: slotsFromAPI.map((time) => {
            const matched = data.status?.find(
                (appt) => appt.slotId === `${time} ${dateformat}`
            );
            return {
                slotId: `${time} ${dateformat}`,
                time,
                status: matched ? matched.status : "available",
            };
            }),
        };
        });
    }, [data]);
    return {weeklySchedule};
}