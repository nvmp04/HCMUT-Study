import { ArrowLeft, Star, CheckCircle, User, Mail, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import avt from '../../../../assets/avt.jpg'

export default function InfoSection({ tutor }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <Link
        to="/student/schedule"
        className="flex items-center gap-2 w-max mb-6 text-gray-500 text-sm hover:text-blue-500 transition-all"
      >
        <ArrowLeft size={18} /> Quay lại
      </Link>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-100">
        <div className="relative">
          <img
            src={avt}
            alt={tutor?.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-50 shadow-sm"
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-gray-100 flex items-center gap-1">
            <Star className="text-yellow-400" size={14} fill="currentColor" />
            <span className="text-xs font-bold text-gray-800">{tutor?.rating}</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{tutor?.name}</h1>
          <p className="text-gray-500 mb-3">{tutor?.totalReviews} đánh giá</p>
          <span className="inline-flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold border border-green-100">
            <CheckCircle size={14} /> Đang giảng dạy
          </span>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            Thông tin cơ bản
          </h2>
          <div className="flex flex-col gap-5">
            <InfoItem icon={<User size={18} />} label="Mã cán bộ" value={tutor?.id} />
            <InfoItem icon={<BookOpen size={18} />} label="Khoa/Chuyên ngành" value={tutor?.department} />
            <InfoItem icon={<Mail size={18} />} label="Email học vụ" value={tutor?.email} />
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-800 mb-3">Giới thiệu</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {tutor?.bio}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-800 mb-3">Môn học giảng dạy</h3>
          <div className="flex flex-wrap gap-2">
            {tutor?.subjects?.map((s, i) => (
              <span 
                key={i} 
                className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <span className="text-gray-400">{icon}</span> {label}
      </div>
      <div className="pl-7 text-gray-900 font-semibold text-base">{value}</div>
    </div>
  );
}