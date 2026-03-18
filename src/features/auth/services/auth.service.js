import { fetchAPI } from "../../../utils/fetchAPI";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";

export async function loginAPI(credentials) {
    const url = buildAPIUrl(API_ENDPOINTS.AUTH.LOGIN);
    const response = await fetchAPI(url, 'POST', credentials, false);
    if(response.banned) return {banned: response.banned};
    if(response?.ssoToken){
        return {token: response.ssoToken, user: response.user};
    }
    return {error: response.error};
}