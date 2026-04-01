import { Calendar } from "lucide-react";
import { useParams } from "react-router-dom";
import ScheduleSelector from "./ScheduleSelector"; // Đường dẫn file vừa tạo

export default function ScheduleSection({ selectedTimeSlot, setBooking }) {
  const { id } = useParams();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
        <Calendar size={20} /> Lịch rảnh trong tuần
      </h2>

      <ScheduleSelector 
        tutorId={id} 
        onSelect={setBooking} 
        selectedTimeSlot={selectedTimeSlot} 
      />
    </div>
  );
}