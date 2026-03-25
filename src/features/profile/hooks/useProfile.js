import { useQuery } from "@tanstack/react-query";
import { getTutorList, getUserProfile } from "../services/profile.service";
import { useAuth } from "../../auth/hooks/useAuth";

export function useProfile(){
    const {auth} = useAuth();
    const {role} = auth;
    return useQuery({
        queryKey: ["user-profile", role], 
        queryFn: async () => getUserProfile(role),
        staleTime: 5*60*1000
    });
}
