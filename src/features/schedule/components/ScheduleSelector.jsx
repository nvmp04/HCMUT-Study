import { Calendar, Clock } from "lucide-react";
import { useState } from "react";
import AlertModal from "../../../components/AlertModal";
import ScheduleConflictModal from "../../../components/ScheduleConflictModal";
import { LoadingModal } from "../../../components/LoadingModal";
import { checkTimeOverlap } from "../../../utils/checkTimeOverlap";
import { getExpiredTimeMessage } from "../utils/generateModalContent";
import { useTutorSchedule } from "../hooks/useTutorSchedule";
import { useAppointments } from "../../appointment/hooks/useAppointments";

export default function ScheduleSelector({ tutorId, onSelect, selectedTimeSlot }) {
  const { weeklySchedule, isScheduleLoading } = useTutorSchedule(tutorId);
  const { data, isLoading } = useAppointments();

  const [conflict, setConflict] = useState({ state: false, tutorName: '', title: '', slotId: '' });
  const [expiredTimeModal, setExpiredTimeModal] = useState(false);
  const { title: expiredTitle, renderMessage: expiredMessage } = getExpiredTimeMessage();

  if (isScheduleLoading || isLoading) return <LoadingModal />;

  const handleTimeSlotClick = (day, timeSlot) => {
    const time = timeSlot.time;
    const start = time.split(' - ')[0];
    const [hour, min] = start.split(':').map(Number);
    const now = new Date();
    const [d, m, y] = day.date.split('/').map(Number);
    const target = new Date(y, m - 1, d, hour, min, 0, 0);

    // 1. Check thời gian quá hạn
    if (now >= target) {
      setExpiredTimeModal(true);
      return;
    }
    // 2. Check trùng lịch của Student
    const sameDayAppt = data.active.filter((a) => {
      return (
        (a.date === day.dateFormat) 
      );
    });

    const [newStartTime, newEndTime] = timeSlot.time.split(' - ');
    const { res, tutorName, title, slotId } = checkTimeOverlap(sameDayAppt, newStartTime, newEndTime);

    if (res) {
      setConflict({ state: true, tutorName, title, slotId });
      return;
    }
    if (timeSlot.status === 'available') {
      onSelect({
        day: day.dayFormat,
        date: day.dateFormat,
        time: timeSlot.time
      });
    }
  };

  return (
    <>
      <div className="grid gap-4 mb-5">
        {weeklySchedule.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between border-b border-gray-200 mb-3 pb-2">
              <h3 className="text-base font-semibold text-gray-800">{day.dayFormat}</h3>
              <span className="text-xs text-gray-400">{day.dateFormat}</span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,140px))] gap-2">
              {day.timeSlots.map((slot, slotIndex) => (
                <button
                  key={slotIndex}
                  className={`flex flex-col items-center justify-center gap-1 min-h-[60px] p-2 border-2 rounded-lg text-sm font-medium transition-all ${
                    slot.status !== 'available'
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                      : (selectedTimeSlot?.time === slot.time && selectedTimeSlot?.date === day.dateFormat)
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-500"
                  }`}
                  onClick={() => handleTimeSlotClick(day, slot)}
                  disabled={slot.status !== 'available'}
                >
                  <Clock size={14} />
                  {slot.time}
                  {slot.status !== 'available' && <span className="text-[10px] font-normal">Đã được đặt</span>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {expiredTimeModal && (
        <AlertModal title={expiredTitle} message={expiredMessage()} onClose={() => setExpiredTimeModal(false)} />
      )}
      <ScheduleConflictModal
        open={conflict.state}
        onClose={() => setConflict({ ...conflict, state: false })}
        title={conflict.title}
        name={conflict.tutorName}
        slotId={conflict.slotId}
      />
    </>
  );
}