import React from 'react';

const getStatusInfo = (status) => {
  switch(status) {
    case 'cancelled': return { text: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-50' };
    case 'expired_pending': return { text: 'Quá hạn chưa xác nhận', color: 'text-amber-700', bg: 'bg-amber-50' };
    case 'accepted': return { text: 'Đã xác nhận', color: 'text-emerald-700', bg: 'bg-emerald-50' };
    case 'pending': return { text: 'Chờ xác nhận', color: 'text-amber-800', bg: 'bg-amber-50' };
    case 'completed': return { text: 'Đã hoàn thành', color: 'text-gray-800', bg: 'bg-gray-100' };
    default: return { text: 'Không xác định', color: 'text-gray-600', bg: 'bg-gray-50' };
  }
};

export default function StatusBadge({ status }) {
  const info = getStatusInfo(status);
  return (
    <div className={`${info.bg} ${info.color} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}>
      {info.text}
    </div>
  );
}
