import { useQuery } from "@tanstack/react-query";
import { getTutorList } from "../services/profile.service";

export function useTutorList(){
    return useQuery({
        queryKey: ['tutors'], 
        queryFn: async () => getTutorList(),
        staleTime: 10*60*1000
    });
}