import { Star, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import avt from "../../../assets/avt.jpg";

export default function Card({ tutor }) {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md border border-gray-100 transition hover:shadow-xl hover:border-gray-200">
      <div className="relative flex justify-center mb-4">
        <img
          src={avt}
          alt={tutor.name}
          className="w-28 h-28 rounded-full border-4 border-gray-50 object-cover"
        />
        <div className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-[#4299e1] text-white px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 whitespace-nowrap">
          <User size={12} />
          Giảng viên
        </div>
      </div>

      <div className="text-center mb-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{tutor.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{tutor.major}</p>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="font-semibold text-gray-900 text-sm">{tutor.rating}</span>
          </div>
          <span className="text-gray-400 text-xs">({tutor.reviews} đánh giá)</span>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          to={`/student/schedule/${tutor.id}`}
          className="bg-gradient-to-r from-[#014181] to-blue-600 text-white font-semibold px-6 py-2.5 rounded-md text-sm shadow-md flex items-center gap-2 transition hover:from-blue-600 hover:to-[#2c5aa0]"
        >
          <Calendar size={16} />
          Đặt lịch
        </Link>
      </div>
    </div>
  );
}
