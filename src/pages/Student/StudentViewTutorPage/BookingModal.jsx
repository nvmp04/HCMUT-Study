import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import studentBooking  from '../../../services/studentBooking';
import AIcheckingModal from '../../../components/AIcheckingModal';
import AIwarningModal from '../../../components/AIwarningModal';

export default function BookingModal({ tutor, selectedTimeSlot, onConfirm, onCancel }) {
  const queryClient = useQueryClient();
  const [sessionTitle, setSessionTitle] = useState('');
  const [modalType, setModalType] = useState('booking');
  const [warningMessage, setWarningMessage] = useState('');
  const [ban, setBan] = useState(false);
  async function handleConfirm() {
    if (!sessionTitle.trim()) return;
    setModalType('checking');
    try {
      const res = await studentBooking(tutor, selectedTimeSlot, sessionTitle);
      const { error, message, ban } = res;
      if (error === 'true') {
        setWarningMessage(message);
        setModalType('error');
        if(ban === 'true' || ban === true) {
          setBan(true);
        }
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['tutorschedule'] });
      onConfirm(sessionTitle);
      setSessionTitle('');
      setModalType('booking');
    } catch (err) {
      console.error('Booking failed:', err);
      setModalType('error');
    }
  }

  return (
    <>
      {modalType === 'booking' && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-[400px] w-[90%] max-h-[90vh] overflow-y-auto shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Xác nhận đặt lịch
            </h3>

            <div className="bg-gray-100 rounded-lg p-4 mb-5">
              <p className="text-gray-600 text-sm mb-2">
                <strong>Tutor:</strong> {tutor.name}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Thời gian:</strong> {selectedTimeSlot.day}, {selectedTimeSlot.date}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Giờ học:</strong> {selectedTimeSlot.time}
              </p>
            </div>

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
                <p className="text-red-500 text-xs mt-1">
                  Vui lòng nhập nội dung buổi học
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg font-medium border border-gray-200 text-gray-600 bg-white hover:bg-gray-100"
                onClick={onCancel}
              >
                Hủy
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium border ${
                  sessionTitle
                    ? 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600'
                    : 'border-gray-300 bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleConfirm}
                disabled={!sessionTitle}
              >
                Xác nhận đặt lịch
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === 'checking' && (
        <AIcheckingModal type="nội dung môn học" />
      )}
      {modalType === 'error' && <AIwarningModal title={ban === true ? 'Cảnh báo' : 'Nội dung không hợp lệ'} content={warningMessage} onClose={()=>setModalType('booking')}/>}
    </>
  );
}
