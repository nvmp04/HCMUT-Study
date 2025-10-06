import { useEffect, useState } from 'react';
import { 
  User, 
  Mail, 
  BookOpen, 
  Calendar, 
  Clock, 
  Star, 
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import avt from '../../../assets/avt.jpg'
import { Link, useParams } from 'react-router-dom';
import { fetchAPI } from '../../../utils/fetchAPI';
import { useQuery } from '@tanstack/react-query';
import { LoadingModal } from '../../../App';
function TutorProfile(){
  const {id} = useParams();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [sessionTitle, setSessionTitle] = useState('');
  const url = 'http://localhost:5000/student/gettutordata';
  const {data, isLoading} = useQuery({
    queryKey: [id],
    queryFn: async () => await fetchAPI(url, 'POST', {id}, true)
  })
  if(isLoading) return <LoadingModal/>

  const weeklySchedule = [
    {
      day: 'Thứ 2',
      date: '28/10/2024',
      timeSlots: [
        { time: '08:00 - 10:00', available: true, id: 'mon-1' },
        { time: '10:00 - 12:00', available: false, id: 'mon-2' },
        { time: '14:00 - 16:00', available: true, id: 'mon-3' },
        { time: '16:00 - 18:00', available: true, id: 'mon-4' }
      ]
    },
    {
      day: 'Thứ 3',
      date: '29/10/2024',
      timeSlots: [
        { time: '08:00 - 10:00', available: true, id: 'tue-1' },
        { time: '10:00 - 12:00', available: true, id: 'tue-2' },
        { time: '14:00 - 16:00', available: false, id: 'tue-3' },
        { time: '16:00 - 18:00', available: true, id: 'tue-4' }
      ]
    },
    {
      day: 'Thứ 4',
      date: '30/10/2024',
      timeSlots: [
        { time: '08:00 - 10:00', available: false, id: 'wed-1' },
        { time: '10:00 - 12:00', available: true, id: 'wed-2' },
        { time: '14:00 - 16:00', available: true, id: 'wed-3' },
        { time: '16:00 - 18:00', available: false, id: 'wed-4' }
      ]
    },
    {
      day: 'Thứ 5',
      date: '31/10/2024',
      timeSlots: [
        { time: '08:00 - 10:00', available: true, id: 'thu-1' },
        { time: '10:00 - 12:00', available: true, id: 'thu-2' },
        { time: '14:00 - 16:00', available: true, id: 'thu-3' },
        { time: '16:00 - 18:00', available: true, id: 'thu-4' }
      ]
    },
    {
      day: 'Thứ 6',
      date: '01/11/2024',
      timeSlots: [
        { time: '08:00 - 10:00', available: true, id: 'fri-1' },
        { time: '10:00 - 12:00', available: false, id: 'fri-2' },
        { time: '14:00 - 16:00', available: true, id: 'fri-3' },
        { time: '16:00 - 18:00', available: false, id: 'fri-4' }
      ]
    }
  ];

  const handleTimeSlotClick = (day, timeSlot) => {
    if (timeSlot.available) {
      setSelectedTimeSlot({
        day: day.day,
        date: day.date,
        time: timeSlot.time,
        id: timeSlot.id
      });
    }
  };

  const handleBookAppointment = () => {
    if (selectedTimeSlot) {
      alert(`Đặt lịch thành công!\nTutor: ${data?.tutor.name}\nThời gian: ${selectedTimeSlot.day}, ${selectedTimeSlot.date}\nGiờ: ${selectedTimeSlot.time}`);
      setSelectedTimeSlot(null);
    }
  };

  const getStatusBadge = (status, statusType) => {
    const statusConfig = {
      active: { color: 'green', icon: CheckCircle },
      inactive: { color: 'gray', icon: AlertCircle },
      busy: { color: 'yellow', icon: Clock }
    };
    
    const config = statusConfig[statusType] || statusConfig.active;
    const Icon = config.icon;
    
    return (
      <span className={`status-badge flex items-center gap-2 status-${config.color}`}>
        <Icon size={14} />
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto p-5 min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-md border border-gray-200">
        <Link
          to="/student/schedule"
          className="flex items-center gap-2 w-max mb-5 text-gray-600 text-sm hover:text-blue-500 transition-all"
        >
          <ArrowLeft size={20} />
          Quay lại
        </Link>

        <div className="flex items-center gap-6">
          {/* Avatar & Rating */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={avt}
              alt={data?.tutor.name}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-gray-50 shadow-lg"
            />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-400" size={16} />
                <span className="font-semibold text-gray-900 text-base">{data?.tutor.rating}</span>
              </div>
              <span className="text-gray-400 text-xs">
                ({data?.tutor.totalReviews} đánh giá)
              </span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{data?.tutor.name}</h1>
            <p className="text-gray-400 text-lg mb-3">{data?.tutor.major}</p>
            {getStatusBadge(data?.tutor.status, data?.tutor.statusType)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        {/* Info Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            Thông tin cơ bản
          </h2>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <User size={18} /> Mã cán bộ
              </div>
              <div className="pl-6 text-gray-900 font-medium text-base">{data?.tutor.id}</div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <BookOpen size={18} /> Khoa/Chuyên ngành
              </div>
              <div className="pl-6 text-gray-900 font-medium text-base">{data?.tutor.department}</div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Mail size={18} /> Email học vụ
              </div>
              <div className="pl-6 text-gray-900 font-medium text-base">{data?.tutor.email}</div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Giới thiệu</h3>
            <p className="text-gray-600 leading-relaxed">{data?.tutor.bio}</p>
          </div>

          {/* Subjects */}
          <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Môn học giảng dạy</h3>
            <div className="flex flex-wrap gap-2">
              {data?.tutor.subjects?.map((subject, index) => (
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

        {/* Schedule Section */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <Calendar size={20} /> Lịch rảnh trong tuần
          </h2>

          <div className="grid gap-4 mb-5">
            {weeklySchedule.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between border-b border-gray-200 mb-3 pb-2">
                  <h3 className="text-base font-semibold text-gray-800">{day.day}</h3>
                  <span className="text-xs text-gray-400">{day.date}</span>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
                  {day.timeSlots.map((slot, slotIndex) => (
                    <button
                      key={slotIndex}
                      className={`flex flex-col items-center justify-center gap-1 min-h-[60px] p-2 border-2 rounded-lg text-sm font-medium transition-all ${
                        !slot.available
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                          : selectedTimeSlot?.id === slot.id
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-500"
                      }`}
                      onClick={() => handleTimeSlotClick(day, slot)}
                      disabled={!slot.available}
                    >
                      <Clock size={14} />
                      {slot.time}
                      {!slot.available && (
                        <span className="text-[10px] font-normal">Đã đặt</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Booking Confirmation */}
          {selectedTimeSlot && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 max-w-[400px] w-[90%] max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Xác nhận đặt lịch
      </h3>

      <div className="bg-gray-100 rounded-lg p-4 mb-5">
        <p className="text-gray-600 text-sm mb-2">
          <strong>Tutor:</strong> {tutorData.name}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <strong>Thời gian:</strong> {selectedTimeSlot.day}, {selectedTimeSlot.date}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Giờ học:</strong> {selectedTimeSlot.time}
        </p>
      </div>

      {/* ✅ Input tên môn học / nội dung buổi học */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tên môn học / Nội dung buổi học <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={sessionTitle}
          onChange={(e) => setSessionTitle(e.target.value)}
          placeholder="Nhập nội dung buổi học..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!sessionTitle && (
          <p className="text-red-500 text-xs mt-1">Vui lòng nhập nội dung buổi học</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded-lg font-medium border border-gray-200 text-gray-600 bg-white hover:bg-gray-100"
          onClick={() => setSelectedTimeSlot(null)}
        >
          Hủy
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium border ${
            sessionTitle
              ? 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600'
              : 'border-gray-300 bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={sessionTitle ? handleBookAppointment : undefined}
          disabled={!sessionTitle}
        >
          Xác nhận đặt lịch
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default TutorProfile;