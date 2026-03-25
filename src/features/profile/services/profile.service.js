import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { fetchAPI } from "../../../utils/fetchAPI";

export async function getUserProfile(role){
    const endpoint = role === 'student' ? API_ENDPOINTS.PROFILE.STUDENT_DETAIL : API_ENDPOINTS.PROFILE.TUTOR_DETAIL;
    const url = buildAPIUrl(endpoint);
    return await fetchAPI(url, 'GET', null, true);
}

export async function getTutorProfile(){

}

export async function getTutorList(){
    const url = buildAPIUrl(API_ENDPOINTS.PROFILE.TUTOR_LIST);
    return await fetchAPI(url, 'GET', null, true);
}