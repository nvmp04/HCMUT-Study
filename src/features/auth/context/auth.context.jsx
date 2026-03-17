import { createContext, useState } from "react";

export const AuthContext = createContext();
export function AuthProvider({children}){
    const [auth, setAuth] = useState({
        token: sessionStorage.getItem("token"),
        role: sessionStorage.getItem('role')
    })
    const [banned, setBanned] = useState(sessionStorage.getItem('banned'));
    return (
        <AuthContext.Provider value = {{auth, setAuth, banned, setBanned}}>
            {children}
        </AuthContext.Provider>
    )
}