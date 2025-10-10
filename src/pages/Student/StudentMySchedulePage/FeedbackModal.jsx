import React, { useState } from "react";
import { Star } from "lucide-react";

export default function FeedbackModal({ open, session, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit({ ...session, rating, comment });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Đánh giá buổi học
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Hãy chia sẻ cảm nhận của bạn về buổi học{" "}
          <span className="font-medium text-slate-800">{session?.subject}</span>
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

        <textarea
          className="w-full border rounded-md p-2 text-sm mb-4 focus:ring-2 focus:ring-yellow-400"
          placeholder="Nhận xét của bạn (không bắt buộc)..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

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
            className={`px-4 py-2 rounded-md text-sm text-white ${
              rating > 0
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-yellow-300 cursor-not-allowed"
            }`}
          >
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}
