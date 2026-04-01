import { fetchAPI } from "../../../utils/fetchAPI";
import { checkTitleRequest } from "../../../services/AIcheck";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { generateBookingContent } from "../utils/generateBookingContent";



export async function studentBooking(profile, tutor, selectedTimeSlot, sessionTitle){
    const url = buildAPIUrl(API_ENDPOINTS.APPOINTMENT.RESCHEDULE)
    const res = await checkTitleRequest(sessionTitle);
    const {error, message, ban} = res;
    if(error === 'true' || error === true) return {error, message, ban};
    const content = generateBookingContent(profile, tutor, selectedTimeSlot, sessionTitle);
    await fetchAPI(url, 'POST', content, true);
    return {error, message, ban};
}

export async function CancelBeforeAccept(appointment){
    const url = buildAPIUrl(API_ENDPOINTS.SCHEDULE.CANCEL_BEFORE_ACCEPT);
    await fetchAPI(url, 'DELETE', {_id: appointment._id}, true);
}

export async function Reschedule(appointment, timeSlot){
    const url = buildAPIUrl(API_ENDPOINTS.APPOINTMENT.RESCHEDULE);
    return await fetchAPI(url, 'PUT', {appointment, timeSlot}, true);
}