import { jwtDecode } from "jwt-decode";

export function getTokenExpiry(token){
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 - Date.now();
}