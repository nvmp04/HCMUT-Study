import { ArrowLeft, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import avt from "../../../assets/avt.jpg"

export default function HeaderSection({ tutor }) {
  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-md border border-gray-200">
      <Link
        to="/student/schedule"
        className="flex items-center gap-2 w-max mb-5 text-gray-600 text-sm hover:text-blue-500 transition-all"
      >
        <ArrowLeft size={20} /> Quay lại
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <img
            src={avt}
            alt={tutor?.name}
            className="w-[120px] h-[120px] rounded-full object-cover border-4 border-gray-50 shadow-lg"
          />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400" size={16} />
              <span className="font-semibold text-gray-900 text-base">{tutor?.rating}</span>
            </div>
            <span className="text-gray-400 text-xs">
              ({tutor?.totalReviews} đánh giá)
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{tutor?.name}</h1>
          <p className="text-gray-400 text-lg mb-3">{tutor?.major}</p>
          <span className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full w-max text-sm font-medium">
            <CheckCircle size={14} /> Đang giảng dạy
          </span>
        </div>
      </div>
    </div>
  );
}
