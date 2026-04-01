import { BookOpen, Mail, Star, CreditCard, Award, GraduationCap } from "lucide-react";
import avt from '../../../../assets/avt.jpg';

export default function TutorProfileCard({ data }) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-[#014181] h-32 relative">
        <div className="absolute -bottom-16 left-8">
          <img
            src={avt}
            alt={data.name}
            className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 px-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{data.name}</h1>
                <p className="text-base text-gray-600 font-medium flex items-center gap-2">
                  <GraduationCap size={18} className="text-[#014181]" />
                  {data.major || data.department}
                </p>
              </div>
              
              {/* Rating Badge */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="text-white fill-white" size={20} />
                  <span className="font-bold text-white text-xl">{data.rating}</span>
                </div>
                <p className="text-xs text-white/90 text-center mt-1">
                  {data.totalReviews} đánh giá
                </p>
              </div>
            </div>

            {/* Grid thông tin */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <dataItem icon={<CreditCard size={20} />} label="Mã cán bộ" value={data.id} />
              <dataItem icon={<BookOpen size={20} />} label="Khoa" value={data.department} />
              <dataItem icon={<Mail size={20} />} label="Email" value={data.email} className="sm:col-span-2" />
            </div>

            {/* Môn học */}
            {data.subjects?.length > 0 && (
              <div className="bg-gradient-to-r from-[#014181]/5 to-transparent rounded-xl p-4 border-l-4 border-[#014181]">
                <div className="flex items-center gap-2 mb-3">
                  <Award size={18} className="text-[#014181]" />
                  <p className="font-semibold text-gray-900">Môn học giảng dạy</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.subjects.map((subject, idx) => (
                    <span key={idx} className="bg-white border border-[#014181]/20 text-[#014181] px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function dataItem({ icon, label, value, className = "" }) {
  return (
    <div className={`flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-200 ${className}`}>
      <div className="w-10 h-10 rounded-lg bg-[#014181]/10 flex items-center justify-center flex-shrink-0 text-[#014181]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}