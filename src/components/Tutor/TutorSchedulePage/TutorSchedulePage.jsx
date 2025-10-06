import React, { useState, useRef } from "react";
import { Calendar, Clock, Plus } from "lucide-react";
import RequestModal from "./RequestModal";
import ConfirmedModal from "./ConfirmedModal";
import AvailableModal from "./AvailableModal";
import AddTimeModal from "./AddTimeModal";


export default function TutorSchedule() {
  const generateRandomStatus = () => {
    const statuses = ["available", "pending", "accepted"];
    const pick = statuses[Math.floor(Math.random() * statuses.length)];

    if (pick === "pending" || pick === "accepted") {
      return {
        status: pick,
        request: {
          studentName: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"][
            Math.floor(Math.random() * 3)
          ],
          subjectName: ["Toán - Đại số", "Vật lý - Cơ học", "Lập trình C cơ bản"][
            Math.floor(Math.random() * 3)
          ],
          note: "Buổi học ôn luyện chuyên sâu",
        },
      };
    }
    return { status: "available" };
  };

  const generateWeeklySchedule = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        day: date.toLocaleDateString("vi-VN", { weekday: "long" }),
        date: date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        timeSlots: [
          { id: `${i}-1`, time: "08:00 - 10:00", ...generateRandomStatus() },
          { id: `${i}-2`, time: "10:00 - 12:00", ...generateRandomStatus() },
          { id: `${i}-3`, time: "16:00 - 17:00", ...generateRandomStatus() },
          { id: `${i}-4`, time: "17:00 - 18:00", ...generateRandomStatus() },
        ],
      };
    });
  };

  const [weeklySchedule, setWeeklySchedule] = useState(generateWeeklySchedule());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [modalType, setModalType] = useState(null);

  const updateSlot = (dayIndex, slotIndex, patch) => {
    setWeeklySchedule((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      clone[dayIndex].timeSlots[slotIndex] = {
        ...clone[dayIndex].timeSlots[slotIndex],
        ...patch,
      };
      return clone;
    });
  };

  const handleTimeSlotClick = (dayIndex, slotIndex) => {
    const slot = weeklySchedule[dayIndex].timeSlots[slotIndex];
    setSelectedTimeSlot({ dayIndex, slotIndex, slot });

    if (slot.status === "pending") setModalType("request");
    else if (slot.status === "accepted") setModalType("confirmed");
    else setModalType("availableActions");
  };

  const handleAcceptRequest = () => {
    const { dayIndex, slotIndex } = selectedTimeSlot;
    updateSlot(dayIndex, slotIndex, { status: "accepted" });
    closeModal();
  };

  const handleDeclineRequest = () => {
    const { dayIndex, slotIndex } = selectedTimeSlot;
    updateSlot(dayIndex, slotIndex, { status: "available", request: undefined });
    closeModal();
  };

  const handleCancelAccepted = () => {
    const { dayIndex, slotIndex } = selectedTimeSlot;
    updateSlot(dayIndex, slotIndex, { status: "available", request: undefined });
    closeModal();
  };

  const handleConfirmDeleteAvailable = () => {
    const { dayIndex, slotIndex } = selectedTimeSlot;
    setWeeklySchedule((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      clone[dayIndex].timeSlots.splice(slotIndex, 1);
      return clone;
    });
    closeModal();
  };
  const [addTime, setAddTime] = useState(false);
  const dayIndexRef = useRef();
  const addSlot = (dayIndex) => {
    dayIndexRef.current = dayIndex;
    setAddTime(true);
    
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
                  onClick={() => addSlot(dayIndex)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100"
                >
                  <Plus size={14} /> Thêm
                </button>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
                {day.timeSlots.map((slot, slotIndex) => (
                  <div key={slot.id}>
                    <button
                      onClick={() => handleTimeSlotClick(dayIndex, slotIndex)}
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
          day={weeklySchedule[selectedTimeSlot.dayIndex].day}
          date={weeklySchedule[selectedTimeSlot.dayIndex].date}
          onClose={closeModal}
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
        />
      )}

      {modalType === "confirmed" && selectedTimeSlot && (
        <ConfirmedModal
          slot={selectedTimeSlot.slot}
          day={weeklySchedule[selectedTimeSlot.dayIndex].day}
          date={weeklySchedule[selectedTimeSlot.dayIndex].date}
          onClose={closeModal}
          onCancel={handleCancelAccepted}
        />
      )}

      {modalType === "availableActions" && selectedTimeSlot && (
        <AvailableModal
          slot={selectedTimeSlot.slot}
          day={weeklySchedule[selectedTimeSlot.dayIndex].day}
          date={weeklySchedule[selectedTimeSlot.dayIndex].date}
          onClose={closeModal}
          onDelete={handleConfirmDeleteAvailable}
        />
      )}
      {addTime && <AddTimeModal 
        setAddTime={setAddTime}
        setWeeklySchedule={setWeeklySchedule}
        weeklySchedule={weeklySchedule}
        dayIndexRef={dayIndexRef}/>}
    </div>
  );
}
