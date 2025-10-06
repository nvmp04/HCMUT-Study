import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {fetchAPI} from '../../../utils/fetchAPI'
import { LoadingModal } from "../../../App";
export default function StudentHomepage() {
  const url = 'http://localhost:5000/student/getstudentdata'
  const {data, isLoading} = useQuery({
    queryKey: [], 
    queryFn: async () => await fetchAPI(url, 'GET', null, true)
  })
  if(isLoading) return <LoadingModal/>
  const sessions = [];

  const resources = [
    { id: 1, title: "Giáo trình Giải tích 1", course: "MA101", link: "#" },
    { id: 2, title: "Slide Cấu trúc dữ liệu", course: "CS200", link: "#" },
  ];

  return (
    <div className="max-w-[1000px] mx-auto py-20 px-8">
      {/* THÔNG TIN SINH VIÊN */}
      <div className="bg-white border border-[#ddd] mb-8 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
        <div className="px-6 py-4 border-t-[5px] border-t-[#014181] border-b border-[#eee]">
          <h2 className="m-0 text-[1.3rem] font-semibold">THÔNG TIN SINH VIÊN</h2>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <p>
              <strong>Họ tên:</strong> {data.student.name}
            </p>
            <p>
              <strong>MSSV:</strong> {data.student.id}
            </p>
            <p>
              <strong>Khoa:</strong> {data.student.department}
            </p>
            <p>
              <strong>Email:</strong> {data.student.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {data.student.phone}
            </p>
          </div>
          <div>
            <p>
              <strong>Vai trò:</strong> {data.student.role}
            </p>
            <p>
              <strong>Trạng thái:</strong> {data.student.status}
            </p>
          </div>
        </div>
      </div>

      {/* LỊCH HẸN */}
      <div className="bg-white border border-[#ddd] mb-8 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
        <div className="px-6 py-4 border-t-[5px] border-t-[#014181] border-b border-[#eee] flex items-center justify-between">
          <h2 className="m-0 text-[1.3rem] font-semibold">LỊCH HỌC</h2>
          <Link
            to="/student/schedule"
            className="bg-[#f0f0f0] text-[#333] px-4 py-2 rounded-md cursor-pointer"
          >
            + Đặt lịch mới
          </Link>
        </div>
        <div className="p-6">
          {sessions.length === 0 ? (
            <p>Chưa có buổi nào được lên lịch.</p>
          ) : (
            <ul className="list-none p-0 m-0">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="flex justify-between items-center py-3 border-b border-[#eee]"
                >
                  <div>
                    <p className="font-bold">{s.topic}</p>
                    <p className="text-sm text-gray-700">
                      {s.date} · {s.location} · Tutor: {s.tutor}
                    </p>
                  </div>
                  <button className="bg-[#e53935] text-white px-4 py-2 rounded-md cursor-pointer">
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
