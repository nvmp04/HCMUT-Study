import { useState } from "react";
import { X, Clock } from "lucide-react";
import { checkTimeOverlap } from "../../../utils/checkTimeOverlap";

export default function AddTimeModal({ setAddTime, weeklySchedule, setWeeklySchedule, dayIndexRef }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const dayIndex = dayIndexRef.current;
  const handleSave = () => {
    if (!startTime || !endTime) {
      setError("Vui lòng chọn đầy đủ thời gian.");
      return;
    }

    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    if (startMinutes >= endMinutes) {
      setError("Thời gian không hợp lệ");
      return;
    }
    const {res, err} = checkTimeOverlap(weeklySchedule[dayIndex].timeSlots, startTime, endTime);
    if(res && err){
      setError(err);
    }
    else{
      setWeeklySchedule((prev) => {
        const clone = JSON.parse(JSON.stringify(prev));
        const newId = `${dayIndex}-new-${Date.now()}`;
        clone[dayIndex].timeSlots.push({
          id: newId,
          time: `${startTime} - ${endTime}`,
          status: "available",
        });
        return clone;
      });
      setError("");
      setAddTime(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Nút đóng */}
        <button
          onClick={() => setAddTime(false)}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Clock size={20} /> Thêm khung giờ rảnh
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Giờ bắt đầu
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setError(""); 
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Chọn giờ bắt đầu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Giờ kết thúc
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setError(""); 
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Chọn giờ kết thúc"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setAddTime(false)}
            className="px-4 py-2 rounded-md bg-gray-100 text-slate-700 hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Lưu giờ
          </button>
        </div>
      </div>
    </div>
  );
}
