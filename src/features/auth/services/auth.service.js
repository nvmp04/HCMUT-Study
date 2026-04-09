import { fetchAPI } from "../../../utils/fetchAPI";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";

export async function loginAPI(credentials) {
    const url = buildAPIUrl(API_ENDPOINTS.AUTH.LOGIN);
    const response = await fetchAPI(url, 'POST', credentials, false);
    if(response.banned) return {banned: response.banned};
    if(response?.token){
        return {token: response.token, user: response.user};
    }
    return {error: response.error};
}

export async function tutorMode(){
    const url = buildAPIUrl(API_ENDPOINTS.AUTH.TUTOR_MODE);
    return await fetchAPI(url, 'GET', null, true);
}