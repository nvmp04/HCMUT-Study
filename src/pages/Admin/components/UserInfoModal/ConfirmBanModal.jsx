import { useState } from "react";
import { Ban } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../../utils/fetchAPI";
import { API_BASE_URL } from "../../../../config/api.config";

export function ConfirmBanModal({selectedUser, onOpen, onClose, setShowConfirmBan}){
    if(!onOpen) return null;
    const queryClient = useQueryClient();
    const [banMessage, setBanMessage] = useState("");
    const handleBanConfirm = async (selectedUser) => {
        if (!banMessage.trim()) {
          alert("Vui lòng nhập nội dung gửi đến người dùng trước khi cấm.");
          return;
        }
        const role = selectedUser.role === 'student' ? 'student' : 'tutor';
        const url = API_BASE_URL + "/admin/ban";
        fetchAPI(url, 'PUT', {id: selectedUser.id, role, email: selectedUser.email, message: banMessage}, true);
        queryClient.invalidateQueries(['banlist']);
        queryClient.invalidateQueries([role==='tutor' ? 'tutorsboard' : 'studentsboard']);
        onClose();
    };
    return(
        <>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-red-100">
            <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
              <Ban className="w-5 h-5" /> Xác nhận cấm tài khoản
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              Hành động này sẽ cấm tài khoản <strong>{selectedUser.name}</strong>. 
              Xác nhận tiếp tục?
            </p>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nội dung gửi đến người dùng
            </label>
            <textarea
              value={banMessage}
              onChange={(e) => setBanMessage(e.target.value)}
              rows="3"
              placeholder="Nhập nội dung thông báo sẽ được gửi qua email..."
              className="w-full px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-slate-700 mb-4 transition"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmBan(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition"
              >
                Hủy
              </button>
              <button
                onClick={()=>handleBanConfirm(selectedUser)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
              >
                Xác nhận cấm
              </button>
            </div>
          </div>
        </div>
        </>
    )
}