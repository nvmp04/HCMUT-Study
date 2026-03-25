import { User, Mail, BookOpen, Phone, Star, CreditCard, Award, GraduationCap } from "lucide-react";
import { useAuth } from "../../../auth/hooks/useAuth";
import avt from '../../../../assets/avt.jpg'
export default function HomepageProfileCard({ data }) {
  const {auth} = useAuth();
  const role = auth.role;
  const isTutor = role === "tutor";
  const info = isTutor ? data.tutor : data.student;

  if (isTutor) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#014181] h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <img
              src={avt}
              alt={info.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left - Info chính */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{info.name}</h1>
                  <p className="text-base text-gray-600 font-medium flex items-center gap-2">
                    <GraduationCap size={18} className="text-[#014181]" />
                    {info.major || info.department}
                  </p>
                </div>
                
                {/* Rating Badge */}
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="text-white fill-white" size={20} />
                    <span className="font-bold text-white text-xl">{info.rating}</span>
                  </div>
                  <p className="text-xs text-white/90 text-center mt-1">
                    {info.totalReviews} đánh giá
                  </p>
                </div>
              </div>

              {/* Grid thông tin */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#014181]/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard size={20} className="text-[#014181]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Mã cán bộ</p>
                    <p className="text-sm font-semibold text-gray-900">{info.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#014181]/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={20} className="text-[#014181]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Khoa</p>
                    <p className="text-sm font-semibold text-gray-900">{info.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-200 sm:col-span-2">
                  <div className="w-10 h-10 rounded-lg bg-[#014181]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#014181]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{info.email}</p>
                  </div>
                </div>
              </div>

              {/* Môn học */}
              {info.subjects?.length > 0 && (
                <div className="bg-gradient-to-r from-[#014181]/5 to-transparent rounded-xl p-4 border-l-4 border-[#014181]">
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={18} className="text-[#014181]" />
                    <p className="font-semibold text-gray-900">Môn học giảng dạy</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {info.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-[#014181]/20 text-[#014181] px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                      >
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

  // Student
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="lg:w-80 bg-[#014181] p-8 flex flex-col items-center justify-center text-white">
          <img
            src={info.avatar || avt}
            alt={info.name}
            className="w-36 h-36 rounded-2xl object-cover border-4 border-white/20 shadow-2xl mb-4"
          />
          <h1 className="text-2xl font-bold text-center mb-2">{info.name}</h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 mb-4">
            <p className="text-sm font-medium">{info.department}</p>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-green-500 rounded-full px-4 py-2 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">{info.status}</span>
          </div>
        </div>

        {/* Right Panel - Details */}
        <div className="flex-1 p-8">
          <div className="space-y-4">
            {/* Info Cards */}
            <div className="grid gap-4">
              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-[#014181] flex items-center justify-center flex-shrink-0">
                  <CreditCard size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Mã số sinh viên</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{info.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-[#014181] flex items-center justify-center flex-shrink-0">
                  <BookOpen size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Ngành học</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{info.major || info.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-[#014181] flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
                  <p className="text-base font-semibold text-gray-900 mt-1 truncate">{info.email}</p>
                </div>
              </div>

              {info.phone && (
                <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-[#014181] flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Số điện thoại</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{info.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-[#014181] flex items-center justify-center flex-shrink-0">
                  <User size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Vai trò</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{info.role === 'student' ? "Sinh viên" : "Giảng viên"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}