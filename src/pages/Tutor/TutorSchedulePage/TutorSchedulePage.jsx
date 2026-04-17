import React, { useState, useEffect } from "react";
import { Calendar, Clock, Plus, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import RequestModal from "./RequestModal";
import ConfirmedModal from "./ConfirmedModal";
import AvailableModal from "./AvailableModal";
import { AddTimeModal, weekdayMap2 } from "./AddTimeModal";
import { EndModal } from "./EndModal";
import { LoadingModal } from "../../../components/LoadingModal";

import { fetchAPI } from "../../../utils/fetchAPI";
import { useSocket } from "../../../features/websocket/hooks/useSocket";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { useTutorSchedule } from '../../../features/schedule/hooks/useTutorSchedule';

export default function TutorSchedule() {
  const queryClient = useQueryClient();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [modalType, setModalType] = useState(null);
  const { socket } = useSocket();
  const id = sessionStorage.getItem('id');

  useEffect(() => {
    if (!socket) return;
    const events = ["booksession", "studentcancel"];
    
    const handleEvent = ({ tutorId }) => {
      if (id !== tutorId) return;
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    };

    const handleCBA = ({ tutorId }) => {
      if (id !== tutorId) return;
      setSelectedTimeSlot(null);
      setModalType(null);
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    };

    socket.on('cancelbeforeaccept', handleCBA);
    events.forEach((e) => socket.on(e, handleEvent));
    return () => {
      events.forEach((e) => socket.off(e, handleEvent));
      socket.off('cancelbeforeaccept', handleCBA);
    };
  }, [queryClient, socket, id]);

  const { weeklySchedule, isScheduleLoading } = useTutorSchedule(id);

  const handleTimeSlotClick = (slot, day) => {
    setSelectedTimeSlot({ ...slot, dateFormat: day.dateFormat, dayFormat: day.dayFormat });
    
    if (slot.status === "pending") setModalType("request");
    else if (slot.status === "accepted") {
      const endTime = slot.time.split(' - ')[1];
      const [hours, minutes] = endTime.split(":").map(Number);
      const [d, m, y] = slot.appointment.date.split("/").map(Number);
      const endDateTime = new Date(y, m - 1, d, hours, minutes);
      if ((endDateTime - new Date()) <= 0) setModalType("end");
      else setModalType("confirmed");
    }
    else setModalType("availableActions");
  };

  const handleConfirmDeleteAvailable = async () => {
    const url = buildAPIUrl(API_ENDPOINTS.SCHEDULE.DELETE_SLOT);
    const { dayFormat, time } = selectedTimeSlot;
    await fetchAPI(url, 'DELETE', { day: weekdayMap2[dayFormat], time }, true);
    queryClient.invalidateQueries(['schedule']);
    closeModal();
  };

  const [selectedDay, setSelectedDay] = useState();
  const addSlot = (day) => {
    setSelectedDay(day);
    setModalType('addTime');
  };

  const closeModal = () => {
    setSelectedTimeSlot(null);
    setModalType(null);
  };

  // Helper để lấy màu sắc theo trạng thái đúng style technical
  const getSlotStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]";
      case "pending":
        // CHỈNH SỬA: Hiệu ứng nhấp nháy rực rỡ hơn (Glow)
        return "bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.6)] ring-1 ring-amber-500/50";
      default:
        return "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20";
    }
  };

  if (isScheduleLoading) return <LoadingModal />;

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-300 md:p-18">
      <div className="max-w-5xl mx-auto">

        {/* MAIN SCHEDULE CARD */}
        <div className="bg-[#161e2e] border border-white/5 rounded-sm shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-black/20 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2"> Lịch trong 7 ngày tới
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {weeklySchedule.map((day, dayIndex) => (
              <motion.div 
                key={dayIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dayIndex * 0.05 }}
                className="relative group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-sm border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] transition-all">
                  
                  {/* Ngày tháng bên trái */}
                  <div className="min-w-[100px] flex flex-row md:flex-col items-baseline md:items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-white/5 pb-2 md:pb-0 md:pr-4">
                    <span className="text-x5 font-black text-white leading-none tracking-tighter uppercase italic">
                      {day.dayFormat}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 mt-1">
                      {day.dateFormat}
                    </span>
                  </div>

                  {/* Slots hiển thị */}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {day.timeSlots.map((slot, slotIndex) => (
                          <motion.button
                            key={slotIndex}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTimeSlotClick(slot, day)}
                            className={`flex flex-col items-start p-3 border rounded-sm min-w-[120px] transition-all relative overflow-hidden ${getSlotStyles(slot.status)}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Clock size={12} />
                              <span className="text-[11px] font-black font-mono tracking-tight">{slot.time}</span>
                            </div>
                            
                            <div className="text-[9px] font-black uppercase tracking-tighter opacity-80 flex items-center gap-1">
                              {slot.status === "pending" && <AlertCircle size={10} />}
                              {slot.status === "accepted" && <CheckCircle2 size={10} />}
                              {slot.status === "available" ? "Trống" : slot.status === "pending" ? "Yêu cầu" : "Đã duyệt"}
                            </div>

                            {/* Decor nhỏ cho status pending */}
                            {slot.status === "pending" && (
                              <div className="absolute top-0 right-0 w-1 h-full bg-amber-400 shadow-[0_0_10px_#f59e0b]"></div>
                            )}
                          </motion.button>
                        ))}
                      </AnimatePresence>

                      {/* Nút thêm khung giờ */}
                      <button
                        onClick={() => addSlot(day)}
                        className="flex items-center justify-center p-3 border border-dashed border-white/10 rounded-sm min-w-[120px] text-slate-500 hover:border-blue-500/50 hover:text-blue-400 transition-all group/btn"
                      >
                        <Plus size={16} className="group-hover/btn:rotate-90 transition-transform" />
                        <span className="text-[10px] font-black uppercase ml-2 italic">Thêm</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-6 flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Đã xác nhận
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_5px_#f59e0b]"></div> Yêu cầu mới
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white/20 rounded-full"></div> Khung trống
          </div>
        </div>
      </div>

      {/* ---- MODALS ---- */}
      <AnimatePresence>
        {modalType === "request" && selectedTimeSlot && (
          <RequestModal slot={selectedTimeSlot} onClose={closeModal} />
        )}
        {modalType === "confirmed" && selectedTimeSlot && (
          <ConfirmedModal slot={selectedTimeSlot} onClose={closeModal} />
        )}
        {modalType === "availableActions" && selectedTimeSlot && (
          <AvailableModal slot={selectedTimeSlot} onClose={closeModal} onDelete={handleConfirmDeleteAvailable} />
        )}
        {modalType === "addTime" && (
          <AddTimeModal onClose={() => setModalType(null)} day={selectedDay} />
        )}
        {modalType === "end" && (
          <EndModal onClose={() => setModalType(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}