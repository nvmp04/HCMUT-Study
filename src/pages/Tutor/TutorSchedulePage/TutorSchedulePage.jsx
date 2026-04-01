import { useState, useMemo, useEffect } from "react";
import { Calendar, Clock, Plus } from "lucide-react";
import RequestModal from "./RequestModal";
import ConfirmedModal from "./ConfirmedModal";
import AvailableModal from "./AvailableModal";
import {AddTimeModal, weekdayMap2} from "./AddTimeModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { EndModal } from "./EndModal";
import { useSocket } from "../../../features/websocket/hooks/useSocket";
import { API_BASE_URL } from "../../../config/api.config";
import {useTutorSchedule} from '../../../features/schedule/hooks/useTutorSchedule'
import { LoadingModal } from "../../../components/LoadingModal";

export default function TutorSchedule() {
  const queryClient = useQueryClient();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [modalType, setModalType] = useState(null);
  const {socket} = useSocket();
  const url = API_BASE_URL + '/tutor/getschedule';
  // const {data, isLoading} = useQuery({
  //   queryKey: ['schedule'], 
  //   queryFn: async ()=> await fetchAPI(url, 'GET', null, true)
  // })
  const id = sessionStorage.getItem('id');
  useEffect(() => {
    if(!socket) return;
    const events = ["booksession", "studentcancel"];
    function handleEvent({tutorId}){
      if(id !== tutorId) return;
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    }
    function handleCBA({tutorId}){
      if(id !== tutorId) return;
      setSelectedTimeSlot(null);
      setModalType(null);
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    } 
    socket.on('cancelbeforeaccept', handleCBA);
    events.forEach((e)=>{socket.on(e, handleEvent)}); 
    return () => {
      events.forEach((e)=>{socket.off(e, handleEvent)});
    };
  }, [queryClient, socket]);
  const {weeklySchedule, isScheduleLoading} = useTutorSchedule(id);
  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot({ slot });
    if (slot.status === "pending") setModalType("request");
    else if (slot.status === "accepted") {
      const endTime = slot.time.split(' - ')[1];
      const [hours, minutes] = endTime.split(":").map(Number);
      const [day, month, year] = slot.appointment.date.split("/").map(Number);
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

  async function handleConfirmDeleteAvailable(){
    const url = API_BASE_URL + '/tutor/adddeleteslot';
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
  
  if(isScheduleLoading) return <LoadingModal/>
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
                  <h3 className="text-base font-semibold text-gray-800 capitalize">{day.dayFormat}</h3>
                  <span className="text-xs text-gray-400">{day.dateFormat}</span>
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
                  <div key={slotIndex}>
                    <button
                      onClick={() => handleTimeSlotClick(slot, day.time)}
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
          onClose={closeModal}
        />
      )}

      {modalType === "confirmed" && selectedTimeSlot && (
        <ConfirmedModal
          slot={selectedTimeSlot.slot}
          day={selectedTimeSlot.day}
          date={selectedTimeSlot.date}
          onClose={closeModal}
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