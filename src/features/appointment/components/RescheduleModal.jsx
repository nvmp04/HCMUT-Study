import { Calendar, X } from "lucide-react";
import { useState } from "react";
import ConfirmRescheduleModal from "./ConfirmRescheduleModal";
import ScheduleSelector from "../../schedule/components/ScheduleSelector";
import { useTutorSocket } from "../../websocket/hooks/useTutorSocket";

export default function RescheduleModal({ open, appointment, onClose }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  useTutorSocket(appointment?.tutorId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-[95%] max-h-[90vh] overflow-y-auto shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
          <Calendar size={20} /> Chọn lịch học mới
        </h2>

        <ScheduleSelector 
          tutorId={appointment.tutorId}
          onSelect={(slot) => {
            setSelectedTimeSlot(slot);
          }}
          selectedTimeSlot={selectedTimeSlot}
        />

        <ConfirmRescheduleModal
          appointment={appointment}
          timeSlot={selectedTimeSlot}
          onClose={() => setSelectedTimeSlot(null)}
        />
      </div>
    </div>
  );
}