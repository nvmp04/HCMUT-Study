import { useQuery } from "@tanstack/react-query";
import { tutorMode } from "../services/auth.service";
import { useAuth } from "./useAuth";

export function useTutorMode(){
    const {auth} = useAuth();
    return useQuery({
        queryKey: ['mode'],
        queryFn: tutorMode,
        enabled: !!auth.token
    })
}