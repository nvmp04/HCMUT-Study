import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../components/LoadingModal";
import TutorCard from "../../profile/components/shared/TutorCard";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";
import { Users } from "lucide-react";

export function TutorList({ tutorsId }) {
  const url = buildAPIUrl(API_ENDPOINTS.ROADMAP.SUITABLE_TUTORS);
  const { data, isLoading } = useQuery({
    queryKey: ["suitabletutors", tutorsId], // Thêm tutorsId vào key để refetch khi cần
    queryFn: async () => await fetchAPI(url, "POST", { tutorsId }, true),
  });

  if (isLoading) return <LoadingModal />;

  const tutors = data?.tutors || [];

  return (
    <div className="w-full">
      {/* Header - Chỉnh màu text sang Slate cho khớp Dark Theme */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <div className="w-10 h-10 bg-blue-500/10 rounded-sm flex items-center justify-center border border-blue-500/20">
          <Users size={20} className="text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-100 uppercase tracking-tight">
            Giảng viên phù hợp ({tutors.length})
          </h2>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            Đề xuất tối ưu theo lộ trình riêng biệt của bạn
          </p>
        </div>
      </div>

      {/* Danh sách giảng viên - Loại bỏ scroll nội bộ, cho phép dàn trải */}
      {tutors.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/[0.05] rounded-md text-slate-600 text-[11px] uppercase tracking-[0.2em] font-bold">
          Không tìm thấy giảng viên phù hợp trong hệ thống.
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <TutorCard tutor={tutor} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}