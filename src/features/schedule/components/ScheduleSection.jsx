import { Calendar, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchAPI } from "../../../utils/fetchAPI";
import AlertModal from "../../../components/AlertModal";
import ScheduleConflictModal from "../../../components/ScheduleConflictModal";
import {checkTimeOverlap} from '../../../utils/checkTimeOverlap'
import { getExpiredTimeMessage } from "../utils/generateModalContent";
import { useTutorSchedule } from "../hooks/useTutorSchedule";
import { useStudentAppointment } from "../hooks/useStudentAppointment";


export default function ScheduleSection({ selectedTimeSlot, setBooking}) {
  const {id} = useParams();
  const {title: expiredTitle, renderMessage: expiredMessage} = getExpiredTimeMessage();

  //Lấy lịch rảnh của Tutor
  const {weeklySchedule} = useTutorSchedule(id);
  //Lấy các cuộc hẹn sắp tới của Student
  const {data} = useStudentAppointment();
  
  const [conflict, setConflict] = useState({state:false, tutorName: '', title: '', slotId: ''});
  const [expiredTimeModal, setExpiredTimeModal] = useState(false); 
  const handleTimeSlotClick = async (day, timeSlot) => {
    const time = timeSlot.time;
    const start = time.split(' - ')[0];
    const hour = Number(start.split(':')[0]);
    const min = Number(start.split(':')[1]);
    const now = new Date();
    const [d, m, y] = day.date.split('/').map(Number);
    const target = new Date(y, m - 1, d, hour, min, 0, 0);
    if (now >= target) {
      setExpiredTimeModal(true);
      return;
    }
    const sameDayAppt = data.appointment.filter((a)=>{
      return (
        a.date.split(' ')[2] ===  timeSlot.slotId.split(' ')[3]
        && (a.status === 'accepted' || a.status === 'pending')
      )
    })
    const newStartTime = timeSlot.time.split(' - ')[0];
    const newEndTime = timeSlot.time.split(' - ')[1];
    const {res, tutorName, title, slotId} = checkTimeOverlap(sameDayAppt, newStartTime, newEndTime);
    if(res){
      setConflict({state:true, tutorName, title, slotId})
      return;
    }
    if (timeSlot.status === 'available') {
      setBooking({
        day: day.day,
        date: day.date,
        time: timeSlot.time,
        slotId: timeSlot.slotId,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
        <Calendar size={20} /> Lịch rảnh trong tuần
      </h2>

      <div className="grid gap-4 mb-5">
        {weeklySchedule.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between border-b border-gray-200 mb-3 pb-2">
              <h3 className="text-base font-semibold text-gray-800">{day.day}</h3>
              <span className="text-xs text-gray-400">{day.date}</span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,140px))] gap-2">
              {day.timeSlots.map((slot, slotIndex) => (
                <button
                  key={slotIndex}
                  className={`flex flex-col items-center justify-center gap-1 min-h-[60px] p-2 border-2 rounded-lg text-sm font-medium transition-all ${
                    slot.status !== 'available'
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                      : selectedTimeSlot?.slotId === slot.slotId
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-500"
                  }`}
                  onClick={() => handleTimeSlotClick(day, slot)}
                  disabled={slot.status !== 'available'}
                >
                  <Clock size={14} />
                  {slot.time}
                  {slot.status !== 'available' && (
                    <span className="text-[10px] font-normal">Đã được đặt</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {expiredTimeModal && <AlertModal 
        title={expiredTitle}
        message={expiredMessage()}
        onClose={()=>setExpiredTimeModal(false)}/>}
      <ScheduleConflictModal
        open={conflict.state} 
        onClose={()=>setConflict({...conflict, state:false})} 
        title={conflict.title} 
        name={conflict.tutorName}
        slotId={conflict.slotId}
      />
    </div>
  );
}
