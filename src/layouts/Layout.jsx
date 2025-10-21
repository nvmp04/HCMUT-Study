import { Outlet } from "react-router-dom";
import NavigationBar from "../components/HeaderFooterNav/NavigationBar";
import NotificationModal from "../components/Notification/NotificationModal";

export function StudentLayout(){
    return (
        <>
            <NotificationModal/>
            <NavigationBar/>
            <Outlet/>
        </>
    )
}
export function TutorLayout(){
    return(
        <>
            <NotificationModal/>
            <NavigationBar/>
            <Outlet/>
        </>
    )
}
export function AdminLayout(){
    return(
        <>
            <Outlet/>
        </>
    )
}