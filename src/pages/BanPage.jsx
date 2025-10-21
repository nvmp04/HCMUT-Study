import React from "react";
import { ShieldAlert } from "lucide-react";

export default function BanPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white border border-blue-200 rounded-2xl shadow-sm max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-50 p-4 rounded-full">
            <ShieldAlert className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Tài khoản của bạn đang bị khóa
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Rất tiếc, tài khoản của bạn hiện đang bị khóa do vi phạm chính sách người dùng.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg py-3 px-4 text-blue-700 text-sm font-medium">
          Vui lòng liên hệ với <span className="font-semibold">quản trị viên</span> để được hỗ trợ mở khóa tài khoản.
        </div>
      </div>
    </div>
  );
}
