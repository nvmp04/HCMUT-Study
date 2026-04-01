import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { fetchAPI } from "../../../utils/fetchAPI";

export async function getUserProfile(){
    const url = buildAPIUrl(API_ENDPOINTS.PROFILE.USER_PROFILE);
    return await fetchAPI(url, 'GET', null, true);
}

export async function getTutorProfile(){

}

export async function getTutorList(){
    const url = buildAPIUrl(API_ENDPOINTS.PROFILE.TUTOR_LIST);
    return await fetchAPI(url, 'GET', null, true);
}