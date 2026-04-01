import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserX, Trash2, Undo2 } from "lucide-react";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../components/LoadingModal";
import { useState } from 'react';
import {ConfirmUnbanModal} from './UserInfoModal/ConfirmUnbanModal'
import { API_BASE_URL } from "../../../config/api.config";

function BanList() {
  const queryClient = useQueryClient();
  const url = API_BASE_URL + "/admin/getbanlist";
  const {data, isLoading} = useQuery({
    queryKey: ['banlist'], 
    queryFn: ()=>fetchAPI(url, 'GET', null, true)
  })
  const [selectedUser, setSelectedUser] = useState(null);
  if(isLoading) return <LoadingModal/>
  const handleUnban = (id, role) => {
    if(role!=='student') role = 'tutor';
    const url = API_BASE_URL + "/admin/unban";
    fetchAPI(url, 'PUT', {id, role}, true);
    queryClient.invalidateQueries(['banlist']);
    queryClient.invalidateQueries([role==='tutor' ? 'tutorsboard' : 'studentsboard']);
  };

  const handleDelete = (id) => {
    console.log("Xóa tài khoản:", id);
    // TODO: Gọi API /admin/deleteUser
  };

  return (
    <>
    <div className="mt-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Danh sách tài khoản bị cấm</h2>
        <p className="text-gray-500 text-sm mt-1">{data.banList.length} tài khoản</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-y-auto max-h-[400px]">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gradient-to-r from-red-50 to-red-100 z-10">
              <tr className="border-b border-gray-200 text-gray-800">
                <th className="px-6 py-4 text-left text-sm font-semibold">Người dùng</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Vai trò</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.banList.map((user) => (
                <tr
                  key={user.id}
                  className="group  transition-colors duration-200"
                >
                  {/* Cột tên */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserX className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-red-600 transition">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Vai trò */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        user.role === "student"
                          ? 
                          "bg-green-50 text-green-700":
                          "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {user.role === "student" ? 'Sinh viên' : 'Giảng viên'}
                    </span>
                  </td>

                  {/* Hành động */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                      >
                        <Undo2 className="w-4 h-4" />
                        Gỡ cấm
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa tài khoản
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ConfirmUnbanModal
      selectedUser={selectedUser}
      onOpen={selectedUser !== null}
      onClose={()=>setSelectedUser(null)}
    />
    </>
  );
}

export default BanList;
