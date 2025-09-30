import { useState } from 'react';
import '../../../style/StudentSchedulePage/tutorReviewPage.css'
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
import { Link } from 'react-router-dom';
function TutorProfile(){
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Sample tutor data
  const tutorData = {
    id: 'GV001',
    name: 'TS. Nguyễn Văn Nam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    staffCode: 'GV001234',
    department: 'Khoa Toán học',
    major: 'Toán học ứng dụng & Thống kê',
    email: 'nguyen.van.nam@university.edu.vn',
    status: 'Đang giảng dạy',
    statusType: 'active', // active, inactive, busy
    rating: 4.8,
    totalReviews: 127,
    bio: 'Tiến sĩ Toán học với hơn 10 năm kinh nghiệm giảng dạy. Chuyên về Giải tích, Đại số tuyến tính và Thống kê ứng dụng. Đã hướng dẫn nhiều sinh viên đạt kết quả cao trong học tập và nghiên cứu.',
    subjects: ['Giải tích I, II', 'Đại số tuyến tính', 'Xác suất thống kê', 'Toán rời rạc']
  };

  // Weekly schedule data
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
      alert(`Đặt lịch thành công!\nTutor: ${tutorData.name}\nThời gian: ${selectedTimeSlot.day}, ${selectedTimeSlot.date}\nGiờ: ${selectedTimeSlot.time}`);
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
      <span className={`status-badge status-${config.color}`}>
        <Icon size={14} />
        {status}
      </span>
    );
  };

  return (
    <div className="tutor-profile">
      {/* Header */}
      <div className="profile-header">
        <Link to='/student/schedule' className="back-btn">
          <ArrowLeft size={20} />
          Quay lại
        </Link>
        
        <div className="header-content">
          <div className="avatar-section">
            <img src={tutorData.avatar} alt={tutorData.name} className="tutor-avatar-review" />
            <div className="rating-info">
              <div className="rating-stars">
                <Star className="star filled" size={16} />
                <span className="rating-number">{tutorData.rating}</span>
              </div>
              <span className="reviews-count">({tutorData.totalReviews} đánh giá)</span>
            </div>
          </div>
          
          <div className="basic-info">
            <h1 className="tutor-name">{tutorData.name}</h1>
            <p className="tutor-title">{tutorData.major}</p>
            {getStatusBadge(tutorData.status, tutorData.statusType)}
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="profile-content">
        <div className="info-section">
          <h2 className="section-title">Thông tin cơ bản</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">
                <User size={18} />
                Mã cán bộ
              </div>
              <div className="info-value">{tutorData.staffCode}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">
                <BookOpen size={18} />
                Khoa/Chuyên ngành
              </div>
              <div className="info-value">{tutorData.department}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">
                <Mail size={18} />
                Email học vụ
              </div>
              <div className="info-value">{tutorData.email}</div>
            </div>
          </div>
          
          <div className="bio-section">
            <h3>Giới thiệu</h3>
            <p>{tutorData.bio}</p>
          </div>
          
          <div className="subjects-section">
            <h3>Môn học giảng dạy</h3>
            <div className="subjects-list">
              {tutorData.subjects.map((subject, index) => (
                <span key={index} className="subject-tag">{subject}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="schedule-section">
          <h2 className="section-title">
            <Calendar size={20} />
            Lịch rảnh trong tuần
          </h2>
          
          <div className="schedule-grid">
            {weeklySchedule.map((day, dayIndex) => (
              <div key={dayIndex} className="day-schedule">
                <div className="day-header">
                  <h3 className="day-name">{day.day}</h3>
                  <span className="day-date">{day.date}</span>
                </div>
                
                <div className="time-slots">
                  {day.timeSlots.map((slot, slotIndex) => (
                    <button
                      key={slotIndex}
                      className={`time-slot ${!slot.available ? 'unavailable' : ''} ${
                        selectedTimeSlot?.id === slot.id ? 'selected' : ''
                      }`}
                      onClick={() => handleTimeSlotClick(day, slot)}
                      disabled={!slot.available}
                    >
                      <Clock size={14} />
                      {slot.time}
                      {!slot.available && <span className="unavailable-text">Đã đặt</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {selectedTimeSlot && (
            <div className="booking-confirmation">
              <div className="confirmation-content">
                <h3>Xác nhận đặt lịch</h3>
                <div className="booking-details">
                  <p><strong>Tutor:</strong> {tutorData.name}</p>
                  <p><strong>Thời gian:</strong> {selectedTimeSlot.day}, {selectedTimeSlot.date}</p>
                  <p><strong>Giờ học:</strong> {selectedTimeSlot.time}</p>
                </div>
                <div className="booking-actions">
                  <button 
                    className="cancel-btn"
                    onClick={() => setSelectedTimeSlot(null)}
                  >
                    Hủy
                  </button>
                  <button 
                    className="confirm-btn"
                    onClick={handleBookAppointment}
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