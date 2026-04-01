import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export function ProtectedRoute({allowedRole}){
    const {auth} = useAuth();
    if(allowedRole !== auth.role || !auth.role){
        return <Navigate to="/" replace />;
    }
    const hasAccess = auth && auth.role === allowedRole;
    return <Outlet/>
}
export function ProtectedLogInRoute(){
    const {auth} = useAuth();
    if(auth.role){
        return <Navigate to={`/${auth.role}`}/>;
    }
    return <Outlet/>
}
export function ProtectedBannedRoute(){
    const {banned} = useAuth();
    if(!banned){
        return <Navigate to={`/${auth.role}`}/>;
    }
    return <Outlet/>
}