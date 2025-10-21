import { fetchAPI } from "../utils/fetchAPI";

export async function LogIn(credentials) {
    const content = credentials;
    const url = `http://localhost:5000/sso/login`;
    const response = await fetchAPI(url, 'POST', content, false);
    if(response.banned) return {banned: response.banned};
    if(response?.ssoToken){
        return {token: response.ssoToken, user: response.user};
    }
    return (response.error);
}