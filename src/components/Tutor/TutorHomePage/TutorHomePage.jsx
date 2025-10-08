import { useState } from "react";
import { Star, User, BookOpen, Mail } from "lucide-react";
import avt from '../../../assets/avt.jpg';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {fetchAPI} from '../../../utils/fetchAPI'
import {LoadingModal} from '../../../App'
function TutorHomePage() {
  const sessions = [{id: 123, topic: 'Cơ sở dữ liệu', date: '04/10/2025', location: 'Phòng 101', tutor: 'Nguyễn Văn A'}];
  const url = 'http://localhost:5000/tutor/gettutordata'
  const {data, isLoading} = useQuery({
    queryKey: ['tutor'], 
    queryFn: async () => await fetchAPI(url, 'GET', null, true)
  })
  if(isLoading) return <LoadingModal/>
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 pt-10">
      <div className="w-full max-w-[900px] flex flex-col gap-6">

        {/* Tutor Info */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 flex flex-col lg:flex-row gap-6">
          {/* Left: Avatar & Rating */}
          <div className="flex flex-col items-center gap-3 lg:w-[300px]">
            <img
              src={avt}
              alt={data.tutor.name}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-gray-50 shadow-lg"
            />
            <div className="flex flex-col items-center gap-1">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.tutor.name}</h1>
                <p className="text-gray-400 text-lg">{data.tutor.major}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="text-yellow-400" size={16} />
                <span className="font-semibold text-gray-900 text-base">{data.tutor.rating}</span>
                <span className="text-gray-400 text-xs">({data.tutor.totalReviews} đánh giá)</span>
              </div>
            </div>
          </div>

          {/* Right: Basic Info + Subjects */}
          <div className="flex-1">
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 gap-3 mb-5">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <User size={18} /> Mã cán bộ:
                <span className="text-gray-900 font-medium ml-1">{data.tutor.id}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <BookOpen size={18} /> Khoa/Chuyên ngành:
                <span className="text-gray-900 font-medium ml-1">{data.tutor.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Mail size={18} /> Email:
                <span className="text-gray-900 font-medium ml-1">{data.tutor.email}</span>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Môn học giảng dạy</h3>
              <div className="flex flex-wrap gap-2">
                {data.tutor.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="bg-white border rounded-lg border-[#ddd] shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
          <div className="px-6 py-4 border-b border-[#eee] flex items-center justify-between">
            <h2 className="text-[1.3rem] font-semibold">LỊCH DẠY</h2>
            <Link
              to="/tutor/myschedule"
              className="bg-[#004080] text-white px-5 py-3 rounded-lg shadow-md hover:bg-[#01386e] hover:shadow-xl font-semibold"
            >
              Quản lý lịch dạy
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
    </div>
  );
}

export default TutorHomePage;
