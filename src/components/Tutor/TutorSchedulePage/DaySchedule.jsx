import SlotButton from "./SlotButton";
import { Plus } from "lucide-react";

export default function DaySchedule({ dayData, dayIndex, onAddSlot, onSlotClick }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between border-b border-gray-200 mb-3 pb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-gray-800">{dayData.day}</h3>
          <span className="text-xs text-gray-400">{dayData.date}</span>
        </div>

        <button
          title="Thêm khung rảnh"
          onClick={() => onAddSlot(dayIndex)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100"
        >
          <Plus size={14} /> Thêm
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
        {dayData.timeSlots.map((slot, slotIndex) => (
          <SlotButton
            key={slot.id}
            slot={slot}
            onClick={() => onSlotClick(dayIndex, slotIndex)}
          />
        ))}
      </div>
    </div>
  );
}
