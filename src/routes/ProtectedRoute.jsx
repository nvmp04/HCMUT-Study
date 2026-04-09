import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useRoleSwitch } from "../features/auth/hooks/useRoleSwitch";

export function ProtectedRoute({allowedRole}){
    const {auth} = useAuth();
    console.log('allowed role:' + allowedRole);
    console.log('current role:' + auth.role);
    const { needsTutorRegistration } = useRoleSwitch();
    if(allowedRole === 'tutor' && needsTutorRegistration) {
        console.log()
        return <Navigate to="/tutor-onboarding" replace />;
    }
    if(!auth.role){
        return <Navigate to="/" replace />;
    }
    if(allowedRole !== auth.role ){
        return <Navigate to={"/" + auth.role} replace/>
    }
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