import { Calendar, PlusCircle, BookOpen, Clock, MapPin, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function HomePage({ data }) {
  const {auth} = useAuth();
  const role = auth.role;
  const isTutor = role === "tutor";
  const title = isTutor ? "Lịch dạy" : "Lịch học";
  const actionLabel = isTutor ? "Quản lý lịch dạy" : "Đặt lịch mới";
  const actionLink = isTutor ? "/tutor/myschedule" : "/student/schedule";

  return (
    <div className="bg-white mb-8 rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-[#014181] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Calendar className="text-white" size={22} />
          </div>
          <h2 className="text-xl font-bold text-white m-0">{title}</h2>
        </div>

        <Link
          to={actionLink}
          className="flex items-center gap-2 bg-white text-[#014181] px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          {isTutor ? <BookOpen size={18} /> : <PlusCircle size={18} />}
          <span>{actionLabel}</span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        {data.appointment.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Calendar className="text-slate-400" size={28} />
            </div>
            <p className="text-slate-500 font-medium">
              Chưa có buổi nào được lên lịch
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.appointment.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-[#014181] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 mb-1">{a.title}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-[#014181]" />
                        {a.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-[#014181]" />
                        {a.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} className="text-[#014181]" />
                        {isTutor ? a.studentName : a.tutorName}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex-shrink-0">
                  <X size={16} />
                  <span className="hidden sm:inline">Hủy lịch</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}