import { Outlet } from "react-router-dom";
import NavigationBar from "../components/HeaderFooterNav/NavigationBar";
import NotificationModal from "../components/Notification/NotificationModal";
import AIchatbot from "../components/AIchatbot";

export function Layout(){
    return (
        <>
            <NotificationModal/>
            <NavigationBar/>
            <AIchatbot/>
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