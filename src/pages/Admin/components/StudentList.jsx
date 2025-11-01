import React, { useState } from "react";
import { XCircle, Hash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../components/LoadingModal";
import UserInfoModal from "./UserInfoModal/UserInfoModal";

function StudentList() {
  const url = "https://hcmut-study-backend.onrender.com/admin/getstudents";
  const { data, isLoading } = useQuery({
    queryKey: ["studentsboard"],
    queryFn: () => fetchAPI(url, "GET", null, true),
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  if (isLoading) return <LoadingModal />;

  // Gom các schedule theo student id
  const unsuccessfulSchedules = data.unsuccessfulSchedules.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const handleSendNotification = () => {
    if (notification.trim()) {
      alert(`Đã gửi thông báo đến ${selectedStudent.name}:\n"${notification}"`);
      setNotification("");
      setShowNotification(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Danh sách sinh viên</h2>
        <p className="text-gray-500 text-sm mt-1">{data.students.length} sinh viên</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-y-auto max-h-[400px]">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gradient-to-r from-blue-50 to-blue-100 z-10">
              <tr className="border-b border-gray-200 text-gray-800">
                <th className="px-6 py-4 text-left text-sm font-semibold">Sinh viên</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Mã sinh viên</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Số lần hủy lịch/tuần</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.students.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="group hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition">
                      {student.name}
                      {student.banned && (
                          <span className="ml-2 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            Đã bị cấm
                          </span>
                        )}
                    </div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1 text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 group-hover:border-blue-300 transition">
                      <Hash className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{student.id || "—"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5">
                      <span className="font-semibold text-red-700">
                        {unsuccessfulSchedules[student.id]?.cancelSchedule.length || 0}
                      </span>
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal chi tiết */}
      <UserInfoModal
        role = {'student'}
        selectedUser={selectedStudent}
        setSelectedUser={setSelectedStudent}
        unsuccessfulSchedules={unsuccessfulSchedules}
        handleSendNotification={handleSendNotification}
      />
    </>
  );
}

export default StudentList;
