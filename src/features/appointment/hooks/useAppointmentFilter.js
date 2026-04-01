import { useMemo } from "react";

export function useAppointmentFilter(appointments){
    return useMemo(()=>{
        return appointments.reduce((acc, appt)=>{
            if(appt.status === 'pending' || appt.status === 'accepted'){
                acc.pendingAppt.push(appt);
            }
            else if(appt.status === 'cancelled'){
                acc.cancelledAppt.push(appt);
            }
            else acc.completedAppt.push(appt);
            return acc;
        }, {pendingAppt: [], cancelledAppt: [], completedAppt: []})
    }, [appointments]);
}