import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { fetchAPI } from "../../../utils/fetchAPI";

export async function getUserProfile(role){
    const endpoint = role === 'student' ? API_ENDPOINTS.STUDENT.PROFILE_DATA : API_ENDPOINTS.TUTOR.PROFILE_DATA;
    const url = buildAPIUrl(endpoint);
    return await fetchAPI(url, 'GET', null, true);
}