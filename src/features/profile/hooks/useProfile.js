import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/profile.service";
import { useAuth } from "../../auth/hooks/useAuth";

export function useProfile(){
    const {auth} = useAuth();
    const {token} = auth;
    return useQuery({
        queryKey: ["user-profile", token], 
        queryFn: async () => getUserProfile(),
        staleTime: 5*60*1000
    });
}
