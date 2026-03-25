import { fetchAPI } from "../../../utils/fetchAPI";
import { checkTitleRequest } from "../../../services/AIcheck";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { generateBookingContent } from "../utils/generateBookingContent";

export default async function studentBooking(tutor, selectedTimeSlot, sessionTitle){
    const res = await checkTitleRequest(sessionTitle);
    const {error, message, ban} = res;
    if(error === 'true' || error === true) return {error, message, ban};
    const content = generateBookingContent(tutor, selectedTimeSlot, sessionTitle);
    const url = buildAPIUrl(API_ENDPOINTS.SCHEDULE.BOOK_SESSION)
    await fetchAPI(url, 'POST', content, true);
    return {error, message, ban};
}