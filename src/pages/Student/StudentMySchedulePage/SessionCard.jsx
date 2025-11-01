import { Calendar, Clock, User, MapPin, Video, AlertCircle, FileText, CheckCircle, XCircle, Edit, Star, Trash } from 'lucide-react';
import StatusBadge from './StatusBadge';
import {fetchAPI} from '../../../utils/fetchAPI'
import { Link } from 'react-router-dom';
export default function SessionCard({
  refetch,
  session,
  isPast,
  isFailed,
  onCancel,
  onReschedule,
  onFeedback, 
  onReport
}) {
    async function handleDeleteCancelled (){
      const content = {_id: session._id}
      const url = 'https://hcmut-study-backend.onrender.com/student/deletecancelled';
      await fetchAPI(url, 'DELETE', content, true);
      refetch();
    }
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4 border-l-4 border-[#00274d]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">{session.title}</h3>
          </div>
          <StatusBadge status={session.status} />
        </div>
        <div className="mb-4 text-sm text-slate-700 mt-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm gap-2">
              <User className="text-blue-500" size={16} />
              <span>{session.tutorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-500" />
              <span>{session.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-500" />
              <span>{session.time}</span>
            </div>

            <div className="flex items-center gap-2">
              {session.type === "online" ? (
                <>
                <Video size={16} className="text-blue-500" />
                <span>Online</span>
                </>
              ) : (
                <>
                <MapPin size={16} className="text-blue-500" />
                <span>{session.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {isFailed && (
          <div className="flex items-start gap-3 bg-red-50 p-3 rounded-md mb-4 text-sm text-red-700">
            <AlertCircle size={16} />
            <div>
              <strong className="mr-1">Lý do:</strong>
              {session.reason}
            </div>
          </div>
        )}
        {isPast && (
          <div className="mb-4">
            <button onClick={()=>onReport(session)}
            className="inline-flex items-center gap-2 text-blue-600 text-sm hover:text-blue-800">
              <FileText size={16} />
              <span>Xem biên bản buổi học</span>
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {isFailed ? (
            <>
            <Link to={'/student/schedule'}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-800 text-white text-sm font-medium"
            >
              <Calendar size={16} />
              Đặt lại lịch học
            </Link>
            <button
              onClick={handleDeleteCancelled}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium"
            >
              <Trash size={16} />
              Xóa lịch
            </button>
            </>
          ) : !isPast ? (
            <>
              {session.status === 'pending' && <button
                onClick={() => onReschedule(session)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
              >
                <Edit size={16} /> Đổi lịch
              </button>}

              <button
                onClick={() => onCancel(session)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
              >
                <XCircle size={16} /> Hủy lịch
              </button>
              {session.type === "online" && (
                <a href={session.link} target='_blank' className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium">
                  <Video size={16} /> Tham gia
                </a>
              )}
            </>
          ) : (
            <>
              {(session.rating !== 0) ? (
                <div className="flex items-center gap-2 text-emerald-600 text-sm">
                  <CheckCircle size={16} />
                  <span className="flex items-center gap-1">Đã đánh giá ({session.rating}/5 <Star size={12} className="fill-yellow-400 text-yellow-400"/>)</span>
                </div>
              ) : (
                <button
                  onClick={() => onFeedback(session)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-400 hover:bg-amber-500 text-slate-800 text-sm font-medium"
                >
                  <Star size={16} /> Đánh giá buổi học
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
}
