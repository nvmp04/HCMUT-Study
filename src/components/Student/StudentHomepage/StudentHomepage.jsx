import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../App";
import { useMemo } from "react";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  IdCard,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  PlusCircle,
  XCircle,
} from "lucide-react";

export default function StudentHomepage() {
  const url = "http://localhost:5000/student/getstudentdata";
  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => await fetchAPI(url, "GET", null, true),
  });

  if (isLoading) return <LoadingModal />;

  sessionStorage.setItem("name", data.student.name);
  sessionStorage.setItem("phone", data.student.phone);

  return (
    <div className="max-w-[1000px] mx-auto py-16 px-6 text-gray-800">
      {/* THÔNG TIN SINH VIÊN */}
      <div className="bg-white border border-[#ddd] mb-10 shadow-lg rounded-2xl overflow-hidden transition-all hover:shadow-xl">
        <div className="px-6 py-4 border-t-[5px] border-t-[#014181] border-b border-[#eee] flex items-center gap-2">
          <User className="text-[#014181]" />
          <h2 className="m-0 text-[1.4rem] font-semibold">
            Thông tin sinh viên
          </h2>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-[#014181] font-medium">
              <User size={18} className="text-[#014181]" />
              Họ tên:
              <span className="font-medium-ml1 text-gray-900">{data.student.name}</span>
            </p>
            <p className="flex items-center gap-2 text-[#014181] font-medium">
              <IdCard size={18} className="text-[#014181]" />
              MSSV: 
              <span className="font-medium-ml1 text-gray-900">
                {data.student.id}
              </span>
            </p>
            <p className="flex items-center gap-2 text-[#014181] font-medium text-[#014181] font-medium">
              <BookOpen size={18} /> Khoa:
              <span className="font-medium-ml1 text-gray-900">
                 {data.student.department}
              </span>
            </p>
            <p className="flex items-center gap-2 text-[#014181] font-medium">
              <Mail size={18} className="text-[#014181]" />
              Email: 
              <span className="font-medium-ml1 text-gray-900">
                {data.student.email}
              </span>
            </p>
            <p className="flex items-center gap-2 text-[#014181] font-medium">
              <Phone size={18} className="text-[#014181]" />
              SĐT: 
              <span className="font-medium-ml1 text-gray-900">
                {data.student.phone}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-[#014181] font-medium">
              <UserCheck size={18} className="text-[#014181]" />
              Vai trò: 
              <span className="font-medium-ml1 text-gray-900">
                {data.student.role}
              </span>
            </p>
            <p className="flex items-center gap-2 text-[#014181] font-medium">
              <Clock size={18} className="text-[#014181]" />
              Trạng thái:{" "}
              <span className="font-medium-ml1 text-gray-900">
                <span
                  className="text-green-600"
                >
                  {data.student.status}
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* LỊCH HỌC */}
      <div className="bg-white border border-[#ddd] shadow-lg rounded-2xl overflow-hidden transition-all hover:shadow-xl">
        <div className="px-6 py-4 border-t-[5px] border-t-[#014181] border-b border-[#eee] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="text-[#014181]" />
            <h2 className="m-0 text-[1.4rem] font-semibold">Lịch học</h2>
          </div>
          <Link
            to="/student/schedule"
            className="flex items-center gap-2 bg-[#014181] text-white px-4 py-2 rounded-md hover:bg-[#013366] transition"
          >
            <PlusCircle size={18} />
            <span>Đặt lịch mới</span>
          </Link>
        </div>

        <div className="p-6">
          {data.appointment.length === 0 ? (
            <p className="text-gray-500 italic">
              Chưa có buổi nào được lên lịch.
            </p>
          ) : (
            <ul className="list-none p-0 m-0 space-y-3">
              {data.appointment.map((a) => (
                <li
                  key={a.id}
                  className="flex justify-between items-center py-4 px-4 border border-[#eee] rounded-lg hover:shadow-md transition"
                >
                  <div>
                    <p className="font-bold text-[#014181] flex items-center gap-2">
                      <BookOpen size={18} /> {a.title}
                    </p>
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <Clock size={16} /> {a.date}
                      <MapPin size={16} /> {a.location}
                      <User size={16} /> {a.tutorName}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 bg-[#e53935] hover:bg-[#c62828] text-white px-4 py-2 rounded-md transition">
                    <XCircle size={18} />
                    Hủy lịch
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
