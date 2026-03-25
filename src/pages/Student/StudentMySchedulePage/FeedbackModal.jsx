import React, { useState } from "react";
import { Star } from "lucide-react";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useQueryClient } from "@tanstack/react-query";

export default function FeedbackModal({ open, appointment, onClose}) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  if (!open) return null;
  const tutorId = appointment.tutorId;
  const handleSubmit = () => {
    if (rating > 0) {
      const url = 'https://hcmut-study-backend.onrender.com/student/rating'
      fetchAPI(url, 'PUT', {tutorId, rating, _id: appointment._id}, true);
      queryClient.invalidateQueries(["studentschedule"]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white flex-col item-center rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Đánh giá buổi học
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Hãy đánh giá chất lượng của buổi học{" "}
          <span className="font-medium text-slate-800">{appointment?.subject}</span>
        </p>

        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`p-2 transition ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="px-4 py-2 rounded-md text-sm text-white bg-yellow-500 hover:bg-yellow-600">
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}
