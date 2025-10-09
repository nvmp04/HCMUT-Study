import { Calendar, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchAPI } from "../../../utils/fetchAPI";
export default function ScheduleSection({ selectedTimeSlot, setSelectedTimeSlot }) {
  const {id} = useParams();
  const url = 'http://localhost:5000/student/getschedule';
  const {data, isLoading} = useQuery({
    queryKey: ['tutorschedule'], 
    queryFn: async ()=> await fetchAPI(url, 'POST', {id}, true)
  })
  const weeklySchedule = useMemo(() => {
    if (!data) return [];
    const today = new Date();
    const weekdayMap = {
      0: "sun",
      1: "mon",
      2: "tues",
      3: "wed",
      4: "thur",
      5: "fri",
      6: "sat",
    };
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const weekday = date.getDay();
      const scheduleKey = weekdayMap[weekday];
      const slotsFromAPI = data?.schedule?.[scheduleKey] || [];
      const dayformat = date.toLocaleDateString("vi-VN", { weekday: "long" });
      const dateformat = date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      return {
        day: dayformat,
        date: dateformat,
        timeSlots: slotsFromAPI.map((time) => {
          const matched = data.status?.find(appt => appt.slotId === (time + ' ' + dateformat));
          return {
          id: time + ' ' + dateformat,
          time, 
          status: matched ? matched.status : 'available'
        }}),
      };
    });
  }, [data]);
  const [expiredTimeModal, setExpiredTimeModal] = useState(false); 
  const handleTimeSlotClick = (day, timeSlot) => {
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
    if (timeSlot.status === 'available') {
      setSelectedTimeSlot({
        day: day.day,
        date: day.date,
        time: timeSlot.time,
        id: timeSlot.id,
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
                      : selectedTimeSlot?.id === slot.id
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-500"
                  }`}
                  onClick={() => handleTimeSlotClick(day, slot)}
                  disabled={slot.status !== 'available'}
                >
                  <Clock size={14} />
                  {slot.time}
                  {slot.status !== 'available' && slot.status !== 'cancelled' && (
                    <span className="text-[10px] font-normal">Đã đặt</span>
                  )}
                  {slot.status === 'cancelled' && (
                    <span className="text-[10px] font-normal">Đã bị hủy</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {expiredTimeModal && <ExpiredTimeModal onClose={()=>setExpiredTimeModal(false)}/>}
    </div>
  );
}
function ExpiredTimeModal({onClose}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-[400px] w-[90%] text-center shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Thời gian đã trôi qua
        </h3>

        <p className="text-gray-600 mb-6">
          Buổi học này đã <strong>quá thời gian bắt đầu</strong>.  
          Vui lòng chọn một khung giờ khác phù hợp hơn.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}