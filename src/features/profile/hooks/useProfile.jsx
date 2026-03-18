import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/profile.service";
import { useAuth } from "../../auth/hooks/useAuth";

export function useProfile(){
    const {auth} = useAuth();
    const {role} = auth;
    return useQuery({
        queryKey: ["user-profile", role], 
        queryFn: async () => getUserProfile(role)
    });
}