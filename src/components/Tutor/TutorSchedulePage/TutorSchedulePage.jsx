import { useState, useRef, useMemo } from "react";
import { Calendar, Clock, Plus } from "lucide-react";
import RequestModal from "./RequestModal";
import ConfirmedModal from "./ConfirmedModal";
import AvailableModal from "./AvailableModal";
import {AddTimeModal, weekdayMap2} from "./AddTimeModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { EndModal } from "./EndModal";


export default function TutorSchedule() {
  const queryClient = useQueryClient();
  const url = 'http://localhost:5000/tutor/getschedule';
  const {data, isLoading} = useQuery({
    queryKey: ['schedule'], 
    queryFn: async ()=> await fetchAPI(url, 'GET', null, true)
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
          const matched = data.appointment?.find(appt => appt.slotId === (time + ' ' + dateformat));
          return{
            id: time + ' ' + dateformat,
            time,
            status: matched ? matched.status : 'available',
            studentName: matched ? matched.studentName : '',
            studentPhone: matched ? matched.studentPhone : '',
            title: matched ? matched.title : ''
        }}),
      };
    });
  }, [data]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [modalType, setModalType] = useState(null);

  const updateSlot = (dayIndex, slotIndex, patch) => {
    // setWeeklySchedule((prev) => {
    //   const clone = JSON.parse(JSON.stringify(prev));
    //   clone[dayIndex].timeSlots[slotIndex] = {
    //     ...clone[dayIndex].timeSlots[slotIndex],
    //     ...patch,
    //   };
    //   return clone;
    // });
  };

  const handleTimeSlotClick = (day, slotIndex) => {
    const Day = weeklySchedule.find((d)=>d.day === day);
    const slot = Day.timeSlots[slotIndex];
    const date = Day.date;
    setSelectedTimeSlot({ day, date, slotIndex, slot });
    if (slot.status === "pending") setModalType("request");
    else if (slot.status === "accepted") {
      const endTime = slot.time.split(' - ')[1];
      const [hours, minutes] = endTime.split(":").map(Number);
      const [day, month, year] = date.split("/").map(Number);
      const endDateTime = new Date(year, month - 1, day, hours, minutes);
      const now = new Date();
      if ((endDateTime - now) / 1000 / 60 <= 0) {
        setModalType("end");
      }
      else {
        setModalType("confirmed");
      }
    }
    else setModalType("availableActions");
  };

  const handleCancelAccepted = () => {
    const { dayIndex, slotIndex } = selectedTimeSlot;
    updateSlot(dayIndex, slotIndex, { status: "available", request: undefined });
    closeModal();
  };

  async function handleConfirmDeleteAvailable(){
    const url = 'http://localhost:5000/tutor/adddeleteslot';
    const {day, slot} = selectedTimeSlot;
    const {time} = slot;
    const content = {day: weekdayMap2[day], time, type: 'delete'};
    await fetchAPI(url, 'PUT', content, true);
    queryClient.invalidateQueries(['schedule']);
    closeModal();
  };
  //selectedDay là state quản lí ngày được thêm khung giờ
  const [selectedDay, setSelectedDay] = useState();
  const addSlot = (day) => {
    setSelectedDay(day);
    setModalType('addTime');
  };

  const closeModal = () => {
    setSelectedTimeSlot(null);
    setModalType(null);
  };

  const slotClassByStatus = (status) => {
    if (status === "accepted") return "bg-emerald-500 border-emerald-500 text-white";
    if (status === "pending") return "bg-red-100 border-red-300 text-red-700";
    return "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-400";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Lịch dạy</h1>
        <p className="text-sm text-slate-500">Quản lý khung giờ rảnh & yêu cầu học viên</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
          <Calendar size={20} /> Lịch trong 7 ngày tới
        </h2>

        <div className="space-y-4 mb-4">
          {weeklySchedule.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between border-b border-gray-200 mb-3 pb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-semibold text-gray-800 capitalize">{day.day}</h3>
                  <span className="text-xs text-gray-400">{day.date}</span>
                </div>
                <button
                  title="Thêm khung rảnh"
                  onClick={() => addSlot(day)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100"
                >
                  <Plus size={14} /> Thêm
                </button>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,120px))] gap-2">
                {day.timeSlots.map((slot, slotIndex) => (
                  <div key={slot.id}>
                    <button
                      onClick={() => handleTimeSlotClick(day.day, slotIndex)}
                      className={`flex flex-col items-center justify-center gap-1 min-h-[60px] p-2 border-2 rounded-lg text-sm font-medium transition-all ${slotClassByStatus(
                        slot.status
                      )}`}
                    >
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span className="text-xs">{slot.time}</span>
                      </div>
                      <div className="text-[11px] mt-1">
                        {slot.status === "available" && "Trống"}
                        {slot.status === "pending" && "Yêu cầu mới"}
                        {slot.status === "accepted" && "Đã xác nhận"}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- MODALS ---- */}
      {modalType === "request" && selectedTimeSlot && (
        <RequestModal
          slot={selectedTimeSlot.slot}
          day={selectedTimeSlot.day}
          date={selectedTimeSlot.date}
          onClose={closeModal}
        />
      )}

      {modalType === "confirmed" && selectedTimeSlot && (
        <ConfirmedModal
          slot={selectedTimeSlot.slot}
          day={selectedTimeSlot.day}
          date={selectedTimeSlot.date}
          onClose={closeModal}
          onCancel={handleCancelAccepted}
        />
      )}
      {modalType === "availableActions" && selectedTimeSlot && (
        <AvailableModal
          slot={selectedTimeSlot.slot}
          day={selectedTimeSlot.day}
          date={selectedTimeSlot.date}
          onClose={closeModal}
          onDelete={handleConfirmDeleteAvailable}
        />
      )}
      {modalType === "addTime" && <AddTimeModal 
        onClose={()=>setModalType(null)}
        day={selectedDay}/>}
      {modalType === "end" && <EndModal onClose={()=>setModalType(null)}/>}
    </div>
  );
}
