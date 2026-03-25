export function generateBookingContent(tutor, selectedTimeSlot, sessionTitle){
    const stuID = sessionStorage.getItem("id");
    return {
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
}