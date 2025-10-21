import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { fetchAPI } from "../../../../utils/fetchAPI";
import { LoadingModal } from "../../../../components/LoadingModal";
import TutorCard from "../../../../components/TutorCard";

export function TutorList({ tutorsId }) {
  const url = "http://localhost:5000/student/getsuitabletutors";
  const { data, isLoading } = useQuery({
    queryKey: ["suitabletutors"],
    queryFn: async () => await fetchAPI(url, "POST", { tutorsId }, true),
  });

  if (isLoading) return <LoadingModal />;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Giảng viên phù hợp ({data.tutors.length})</h2>
          <p className="text-sm text-gray-600">
            Được đề xuất dựa trên lộ trình học tập của bạn
          </p>
        </div>
      </div>

      {/* Danh sách giảng viên */}
      {data.tutors.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          Không tìm thấy giảng viên phù hợp.
        </div>
      ) : (
        <div
          className="
            flex flex-col gap-5 
            max-h-[300px] overflow-y-auto pr-2
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          "
        >
          {data.tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}
