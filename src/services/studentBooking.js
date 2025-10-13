import { fetchAPI } from "../utils/fetchAPI";

export default function studentBooking(tutor, selectedTimeSlot, sessionTitle){
    const stuID = sessionStorage.getItem("id");
    const content = {
        id: tutor.id + stuID,
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
    const url = 'http://localhost:5000/student/booksession'
    fetchAPI(url, 'POST', content, true);
    return;
}