import { Calendar, Clock, X } from "lucide-react";
import {  useState } from "react";
import AlertModal from "../../../components/AlertModal";
import ConfirmRescheduleModal from "./ConfirmRescheduleModal";
import ScheduleConflictModal from "../../../components/ScheduleConflictModal";
import { checkTimeOverlap } from "../../../utils/checkTimeOverlap";
import { useTutorSocket } from "../../../features/websocket/hooks/useTutorSocket";
import { useTutorSchedule } from "../../../features/schedule/hooks/useTutorSchedule";
import { useStudentAppointment } from "../../../features/schedule/hooks/useStudentAppointment";

export default function RescheduleModal({ open, appointment, onClose }) {
  if (!open) return null;
  const id = appointment.tutorId;
  const { weeklySchedule } = useTutorSchedule(id);
  const {data} = useStudentAppointment();
  useTutorSocket(id);

  const [conflict, setConflict] = useState({state:false, tutorName: '', title: '', slotId: ''});
  const [expiredTimeModal, setExpiredTimeModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const handleTimeSlotClick = (day, timeSlot) => {
    const time = timeSlot.time;
    const start = time.split(" - ")[0];
    const hour = Number(start.split(":")[0]);
    const min = Number(start.split(":")[1]);
    const now = new Date();
    const [d, m, y] = day.date.split("/").map(Number);
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
    if (timeSlot.status === "available") {
      setSelectedTimeSlot({
        day: day.day,
        date: day.date,
        time: timeSlot.time,
        slotId: timeSlot.slotId,
      });
      setConfirm(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-[95%] max-h-[90vh] overflow-y-auto shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
          <Calendar size={20} /> Chọn lịch học mới
        </h2>

        <div className="grid gap-4 mb-5">
          {weeklySchedule.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-center justify-between border-b border-gray-200 mb-3 pb-2">
                <h3 className="text-base font-semibold text-gray-800">{day.day}</h3>
                <span className="text-xs text-gray-400">{day.date}</span>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,140px))] gap-2">
                {day.timeSlots.map((slot, slotIndex) => (
                  <button
                    key={slotIndex}
                    className={`flex flex-col items-center justify-center gap-1 min-h-[60px] p-2 border-2 rounded-lg text-sm font-medium transition-all ${
                      slot.status !== "available"
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-500"
                    }`}
                    onClick={() => handleTimeSlotClick(day, slot)}
                    disabled={slot.status !== "available"}
                  >
                    <Clock size={14} />
                    {slot.time}
                    {slot.status !== "available" && (
                      <span className="text-[10px] font-normal">Đã được đặt</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <ConfirmRescheduleModal
          open={confirm}
          appointment={appointment}
          timeSlot={selectedTimeSlot}
          onClose={() => {
            setConfirm(false);
            onClose();
          }
          }
        />

        {expiredTimeModal && (
          <AlertModal onClose={() => setExpiredTimeModal(false)} />
        )}
        <ScheduleConflictModal
          open={conflict.state} 
          onClose={()=>setConflict({...conflict, state:false})} 
          title={conflict.title} 
          name={conflict.tutorName}
          slotId={conflict.slotId}
        />
      </div>
    </div>
  );
}
