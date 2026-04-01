import { User, Mail, BookOpen, Phone, CreditCard } from "lucide-react";
import avt from '../../../../assets/avt.jpg';

export default function StudentProfileCard({ data }) {
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="lg:w-80 bg-[#014181] p-8 flex flex-col items-center justify-center text-white">
          <img
            src={avt}
            alt={data.name}
            className="w-36 h-36 rounded-2xl object-cover border-4 border-white/20 shadow-2xl mb-4"
          />
          <h1 className="text-2xl font-bold text-center mb-2">{data.name}</h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 mb-4">
            <p className="text-sm font-medium">{data.department}</p>
          </div>
          
          <div className="flex items-center gap-2 bg-green-500 rounded-full px-4 py-2 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">{data.status}</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-8">
          <div className="grid gap-4">
            <StudentDetailItem icon={<CreditCard size={22} />} label="Mã số sinh viên" value={data.id} />
            <StudentDetailItem icon={<BookOpen size={22} />} label="Ngành học" value={data.major || data.department} />
            <StudentDetailItem icon={<Mail size={22} />} label="Email" value={data.email} isTruncate />
            {data.phone && <StudentDetailItem icon={<Phone size={22} />} label="Số điện thoại" value={data.phone} />}
            <StudentDetailItem 
              icon={<User size={22} />} 
              label="Vai trò" 
              value={data.role === 'student' ? "Sinh viên" : "Giảng viên"} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentDetailItem({ icon, label, value, isTruncate = false }) {
  return (
    <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div className="w-12 h-12 rounded-xl bg-[#014181] flex items-center justify-center flex-shrink-0 text-white">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className={`text-lg font-bold text-gray-900 mt-1 ${isTruncate ? 'truncate text-base' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
}