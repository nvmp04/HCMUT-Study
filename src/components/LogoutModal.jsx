import { useAuth } from "../features/auth/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
export function LogoutModal({ isOpen, setIsOpen }) {
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-3xl shadow-xl p-8 w-full max-w-[448px] mx-4 z-[51]"
          >
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-16 h-16 text-amber-600 bg-amber-50 rounded-full p-3" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Xác Nhận Đăng Xuất</h2>
            <p className="text-slate-600 text-center mb-8">Bạn có chắc muốn đăng xuất khỏi hệ thống?</p>
            <div className="flex gap-3">
              <button onClick={() => setIsOpen(false)} className="flex-1 py-3 rounded-xl font-semibold bg-slate-100">Hủy</button>
              <button onClick={handleLogOut} className="flex-1 py-3 rounded-xl font-semibold bg-red-500 text-white">Đăng Xuất</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}