import { fetchAPI } from "../utils/fetchAPI";
import { checkTitleRequest } from "./AIcheck";

export default async function studentBooking(tutor, selectedTimeSlot, sessionTitle){
    const stuID = sessionStorage.getItem("id");
    const res = await checkTitleRequest(sessionTitle);
    const {error, message, ban} = res;
    if(error === 'true' || error === true) return {error, message, ban};
    const content = {
        studentId: stuID, 
        tutorId: tutor.id,
        status: 'pending',
        studentName: sessionStorage.getItem('name'),
        studentPhone: sessionStorage.getItem('phone'),
        tutorName: tutor.name,
        tutorPhone: tutor.phone,
        date: selectedTimeSlot.day + ', ' + selectedTimeSlot.date,
        time: selectedTimeSlot.time,
        slotId: selectedTimeSlot.time + ' ' + selectedTimeSlot.date,
        title: sessionTitle,
        type: '',
        location: '',
        link: '',
        reason: ''
    }
    const url = 'https://hcmut-study-backend.onrender.com/student/booksession'
    await fetchAPI(url, 'POST', content, true);
    return {error, message, ban};
}