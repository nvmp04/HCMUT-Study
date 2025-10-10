import { Outlet } from "react-router-dom";
import NavigationBar from "../components/HeaderFooterNav/NavigationBar";

export function StudentLayout(){
    return (
        <>
            <NavigationBar/>
            <Outlet/>
        </>
    )
}
export function TutorLayout(){
    return(
        <>
            <NavigationBar/>
            <Outlet/>
        </>
    )
}
