import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Video, MessageSquare, Star, FileText, AlertCircle, CheckCircle, XCircle, Edit, Trash2, Bell } from 'lucide-react';
import '../../../style/StudentMySchedulePage/studentMySchedulePage.css'

const StudentMySchedulePage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Mock data
  const upcomingSessions = [
    {
      id: 1,
      subject: 'Cấu trúc dữ liệu & Giải thuật',
      tutor: 'TS. Nguyễn Văn Nam',
      date: '2025-10-05',
      time: '14:00 - 16:00',
      location: 'Phòng H6-305',
      type: 'offline',
      status: 'confirmed',
      reminderSent: true
    },
    {
      id: 2,
      subject: 'Lập trình Web',
      tutor: 'ThS. Trần Thị B',
      date: '2025-10-07',
      time: '09:00 - 11:00',
      location: 'Google Meet',
      type: 'online',
      status: 'pending',
      reminderSent: false
    }
  ];

  const pastSessions = [
    {
      id: 3,
      subject: 'Cơ sở dữ liệu',
      tutor: 'TS. Lê Văn C',
      date: '2025-09-28',
      time: '15:00 - 17:00',
      location: 'Phòng H6-201',
      type: 'offline',
      status: 'completed',
      hasMinutes: true,
      hasFeedback: true,
      myRating: 5
    },
    {
      id: 4,
      subject: 'Lập trình hướng đối tượng',
      tutor: 'ThS. Phạm Thị D',
      date: '2025-09-25',
      time: '10:00 - 12:00',
      location: 'Zoom',
      type: 'online',
      status: 'completed',
      hasMinutes: false,
      hasFeedback: false
    }
  ];

  const failedSessions = [
    {
      id: 5,
      subject: 'Trí tuệ nhân tạo',
      tutor: 'TS. Hoàng Văn E',
      date: '2025-09-30',
      time: '14:00 - 16:00',
      location: 'Phòng H6-405',
      type: 'offline',
      status: 'rejected',
      reason: 'Tutor có lịch trình đột xuất không thể sắp xếp'
    },
    {
      id: 6,
      subject: 'Công nghệ phần mềm',
      tutor: 'ThS. Nguyễn Thị F',
      date: '2025-09-27',
      time: '10:00 - 12:00',
      location: 'Google Meet',
      type: 'online',
      status: 'cancelled_before_start',
      reason: 'Sinh viên hủy do có việc gấp'
    },
    {
      id: 7,
      subject: 'Mạng máy tính',
      tutor: 'TS. Trần Văn G',
      date: '2025-09-20',
      time: '15:00 - 17:00',
      location: 'Phòng H6-301',
      type: 'offline',
      status: 'expired_pending',
      reason: 'Quá 48h tutor chưa xác nhận'
    }
  ];

  const handleCancelSession = (session) => {
    setSelectedSession(session);
    setShowCancelModal(true);
  };

  const handleRescheduleSession = (session) => {
    setSelectedSession(session);
    setShowRescheduleModal(true);
  };

  const handleProvideFeedback = (session) => {
    setSelectedSession(session);
    setShowFeedbackModal(true);
    setRating(0);
    setFeedback('');
  };

  const submitFeedback = () => {
    console.log('Feedback submitted:', { sessionId: selectedSession.id, rating, feedback });
    setShowFeedbackModal(false);
    alert('Cảm ơn bạn đã đánh giá buổi học!');
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case 'rejected':
        return {  text: 'Tutor từ chối', color: '#dc2626', bgColor: '#fef2f2' };
      case 'cancelled_before_start':
        return {  text: 'Đã hủy', color: '#ea580c', bgColor: '#fff7ed' };
      case 'expired_pending':
        return { text: 'Quá hạn chưa xác nhận', color: '#d97706', bgColor: '#fffbeb' };
      default:
        return {  text: 'Không thành công', color: '#6b7280', bgColor: '#f9fafb' };
    }
  };

  const SessionCard = ({ session, isPast, isFailed }) => {
    const statusInfo = isFailed ? getStatusInfo(session.status) : null;

    return (
      <div className={`session-card ${isFailed ? 'failed' : ''}`}>
        <div className="session-card-header">
          <div className="session-card-content">
            <h3 className="session-subject">{session.subject}</h3>
            <div className="session-tutor">
              <User size={16} />
              <span>{session.tutor}</span>
            </div>
          </div>
          
          {isFailed ? (
            <div className="status-badge failed" style={{ backgroundColor: statusInfo.bgColor, color: statusInfo.color }}>
              {statusInfo.icon} {statusInfo.text}
            </div>
          ) : (
            <div className={`status-badge ${session.status}`}>
              {session.status === 'confirmed' ? 'Đã xác nhận' :
               session.status === 'pending' ? 'Chờ xác nhận' : 'Đã hoàn thành'}
            </div>
          )}
        </div>

        <div className="session-details-grid">
          <div className="session-detail-item">
            <Calendar size={16} />
            <span>{new Date(session.date).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="session-detail-item full-width">
            <Clock size={16} />
            <span>{session.time}</span>
          </div>
          <div className="session-detail-item full-width">
            {session.type === 'online' ? (
              <Video size={16} />
            ) : (
              <MapPin size={16} />
            )}
            <span>{session.location}</span>
          </div>
        </div>

        {isFailed && session.reason && (
          <div className="failure-reason">
            <AlertCircle size={16} />
            <div>
              <strong>Lý do:</strong> {session.reason}
            </div>
          </div>
        )}

        {isPast && session.hasMinutes && (
          <div className="minutes-section">
            <button className="minutes-link">
              <FileText size={16} />
              <span>Xem biên bản buổi học</span>
            </button>
          </div>
        )}

        <div className="action-buttons">
          {isFailed ? (
            <button 
              onClick={() => handleRescheduleSession(session)}
              className="action-button primary"
            >
              <Calendar size={16} />
              Đặt lại lịch học
            </button>
          ) : !isPast ? (
            <>
              <button
                onClick={() => handleRescheduleSession(session)}
                className="action-button primary"
              >
                <Edit size={16} />
                Đổi lịch
              </button>
              <button
                onClick={() => handleCancelSession(session)}
                className="action-button danger"
              >
                <XCircle size={16} />
                Hủy lịch
              </button>
              {session.type === 'online' && (
                <button className="action-button success">
                  <Video size={16} />
                  Tham gia
                </button>
              )}
            </>
          ) : (
            <>
              {session.hasFeedback ? (
                <div className="feedback-status">
                  <CheckCircle size={16} />
                  <span>Đã đánh giá ({session.myRating}/5 ⭐)</span>
                </div>
              ) : (
                <button
                  onClick={() => handleProvideFeedback(session)}
                  className="action-button warning"
                >
                  <Star size={16} />
                  Đánh giá buổi học
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="schedule-container">
      <div className="schedule-content">
        <div className="schedule-header">
          <h1 className="schedule-title">Lịch của tôi</h1>
          <p className="schedule-subtitle">Quản lý và theo dõi các buổi học của bạn</p>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-wrapper">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`tab-button ${activeTab === 'upcoming' ? 'active' : 'inactive'}`}
            >
              Sắp tới ({upcomingSessions.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`tab-button ${activeTab === 'past' ? 'active' : 'inactive'}`}
            >
              Đã học ({pastSessions.length})
            </button>
            <button
              onClick={() => setActiveTab('failed')}
              className={`tab-button ${activeTab === 'failed' ? 'active' : 'inactive'}`}
            >
              Không thành công ({failedSessions.length})
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="sessions-list">
          {activeTab === 'upcoming' && (
            upcomingSessions.length > 0 ? (
              upcomingSessions.map(session => (
                <SessionCard key={session.id} session={session} isPast={false} isFailed={false} />
              ))
            ) : (
              <div className="empty-state">
                <AlertCircle size={48} />
                <p>Bạn chưa có buổi học nào sắp tới</p>
              </div>
            )
          )}

          {activeTab === 'past' && (
            pastSessions.length > 0 ? (
              pastSessions.map(session => (
                <SessionCard key={session.id} session={session} isPast={true} isFailed={false} />
              ))
            ) : (
              <div className="empty-state">
                <AlertCircle size={48} />
                <p>Chưa có lịch sử buổi học</p>
              </div>
            )
          )}

          {activeTab === 'failed' && (
            failedSessions.length > 0 ? (
              failedSessions.map(session => (
                <SessionCard key={session.id} session={session} isPast={false} isFailed={true} />
              ))
            ) : (
              <div className="empty-state">
                <AlertCircle size={48} />
                <p>Không có buổi học nào không thành công</p>
              </div>
            )
          )}
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Xác nhận hủy lịch</h3>
              <p className="modal-description">
                Bạn có chắc chắn muốn hủy buổi học <strong>{selectedSession?.subject}</strong> vào{' '}
                {selectedSession?.date} lúc {selectedSession?.time}?
              </p>
              <div className="form-group">
                <label className="form-label">
                  Lý do hủy
                </label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  placeholder="Nhập lý do hủy lịch..."
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="modal-button secondary"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    alert('Đã hủy lịch thành công!');
                    setShowCancelModal(false);
                  }}
                  className="modal-button danger"
                >
                  Xác nhận hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Đổi lịch học</h3>
              <p className="modal-description">
                Buổi học: <strong>{selectedSession?.subject}</strong>
              </p>
              <div className="form-group">
                <label className="form-label">Ngày mới</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Giờ mới</label>
                <input type="time" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Lý do đổi lịch</label>
                <textarea
                  className="form-textarea"
                  rows="2"
                  placeholder="Nhập lý do..."
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="modal-button secondary"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    alert('Yêu cầu đổi lịch đã được gửi!');
                    setShowRescheduleModal(false);
                  }}
                  className="modal-button primary"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Đánh giá buổi học</h3>
              <p className="modal-description">
                Buổi học: <strong>{selectedSession?.subject}</strong>
              </p>
              <div className="form-group">
                <label className="form-label">Đánh giá chất lượng</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="star-button"
                    >
                      <Star
                        size={32}
                        fill={star <= rating ? '#facc15' : 'none'}
                        stroke={star <= rating ? '#facc15' : '#d1d5db'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Nhận xét của bạn</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="form-textarea"
                  rows="4"
                  placeholder="Chia sẻ trải nghiệm của bạn về buổi học..."
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="modal-button secondary"
                >
                  Hủy
                </button>
                <button
                  onClick={submitFeedback}
                  disabled={rating === 0}
                  className={`modal-button primary ${rating === 0 ? 'disabled' : ''}`}
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMySchedulePage;