import { User, Mail, BookOpen } from "lucide-react";

export default function InfoSection({ tutor }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">Thông tin cơ bản</h2>

      <div className="flex flex-col gap-4 mb-6">
        <InfoItem icon={<User size={18} />} label="Mã cán bộ" value={tutor?.id} />
        <InfoItem icon={<BookOpen size={18} />} label="Khoa/Chuyên ngành" value={tutor?.department} />
        <InfoItem icon={<Mail size={18} />} label="Email học vụ" value={tutor?.email} />
      </div>

      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Giới thiệu</h3>
        <p className="text-gray-600 leading-relaxed">{tutor?.bio}</p>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">Môn học giảng dạy</h3>
        <div className="flex flex-wrap gap-2">
          {tutor?.subjects?.map((s, i) => (
            <span key={i} className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        {icon} {label}
      </div>
      <div className="pl-6 text-gray-900 font-medium text-base">{value}</div>
    </div>
  );
}
