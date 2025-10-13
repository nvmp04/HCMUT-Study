export function checkTimeOverlap(timeSlots, newStartTime, newEndTime){
    const today = new Date()
    for(let i = 0; i<timeSlots.length;i++){
        const {slotId, title, tutorName} = timeSlots[i];
        const startTime = timeSlots[i].time.split(' - ')[0];
        const endTime = timeSlots[i].time.split(' - ')[1];

        //Exist time
        const [hours1, minutes1] = startTime.split(":").map(Number);
        const [hours2, minutes2] = endTime.split(":").map(Number);
        const startDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours1, minutes1);
        const endDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours2, minutes2);

        //New time
        const [h1, m1] = newStartTime.split(":").map(Number);
        const [h2, m2] = newEndTime.split(":").map(Number);
        const newStartDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), h1, m1);
        const newEndDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), h2, m2);

        if (!(newEndDateTime <= startDateTime || newStartDateTime >= endDateTime)) {
            return (slotId && tutorName && title) ? 
            {
                res:true, slotId, tutorName, title, 
            }:
            {
                res: true,
                err: `Trùng lịch: [${startTime} - ${endTime}]`
            };
        }
    }
    return {res: false};
}