export function generateBookingContent(profile, tutor, selectedTimeSlot, sessionTitle){
    return {
        studentId: sessionStorage.getItem("id"), 
        tutorId: tutor.id,
        status: 'pending',
        studentName: profile.name,
        studentPhone: profile.phone,
        tutorName: tutor.name,
        tutorPhone: tutor.phone,
        date: selectedTimeSlot.date,
        time: selectedTimeSlot.time,
        title: sessionTitle,
        type: '',
        location: '',
        link: '',
        reason: ''
    }
}