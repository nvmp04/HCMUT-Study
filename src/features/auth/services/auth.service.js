import { fetchAPI } from "../../../utils/fetchAPI";
export async function loginAPI(credentials) {
    const url = `https://hcmut-study-backend.onrender.com/sso/login`;
    const response = await fetchAPI(url, 'POST', credentials, false);
    if(response.banned) return {banned: response.banned};
    if(response?.ssoToken){
        return {token: response.ssoToken, user: response.user};
    }
    return {error: response.error};
}