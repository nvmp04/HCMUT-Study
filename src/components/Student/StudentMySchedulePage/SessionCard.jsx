import React from 'react';
import { Calendar, Clock, User, MapPin, Video, AlertCircle, FileText, CheckCircle, XCircle, Edit, Star } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function SessionCard({
  session,
  isPast,
  isFailed,
  onCancel,
  onReschedule,
  onFeedback
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 border-l-4 border-[#00274d]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">{session.subject}</h3>
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <User size={16} />
            <span>{session.tutor}</span>
          </div>
        </div>
        <StatusBadge status={session.status} />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-500" />
          <span>{new Date(session.date).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span>{session.time}</span>
        </div>
        <div className="flex items-center gap-2 md:col-span-2">
          {session.type === 'online' ? <Video size={16} className="text-blue-500" /> : <MapPin size={16} className="text-blue-500" />}
          <span>{session.location}</span>
        </div>
      </div>

      {/* Lý do thất bại */}
      {isFailed && session.reason && (
        <div className="flex items-start gap-3 bg-red-50 p-3 rounded-md mb-4 text-sm text-red-700">
          <AlertCircle size={16} />
          <div><strong className="mr-1">Lý do:</strong>{session.reason}</div>
        </div>
      )}

      {/* Biên bản */}
      {isPast && session.hasMinutes && (
        <div className="mb-4">
          <button className="inline-flex items-center gap-2 text-blue-600 text-sm hover:text-blue-800">
            <FileText size={16} />
            <span>Xem biên bản buổi học</span>
          </button>
        </div>
      )}

      {/* Hành động */}
      <div className="flex flex-wrap gap-2">
        {isFailed ? (
          <button onClick={() => onReschedule(session)} className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium">
            <Calendar size={16} />
            Đặt lại lịch học
          </button>
        ) : !isPast ? (
          <>
            <button onClick={() => onReschedule(session)} className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium">
              <Edit size={16} /> Đổi lịch
            </button>
            <button onClick={() => onCancel(session)} className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium">
              <XCircle size={16} /> Hủy lịch
            </button>
            {session.type === 'online' && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium">
                <Video size={16} /> Tham gia
              </button>
            )}
          </>
        ) : (
          <>
            {session.hasFeedback ? (
              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <CheckCircle size={16} />
                <span>Đã đánh giá ({session.myRating}/5 ⭐)</span>
              </div>
            ) : (
              <button onClick={() => onFeedback(session)} className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-400 hover:bg-amber-500 text-slate-800 text-sm font-medium">
                <Star size={16} /> Đánh giá buổi học
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
