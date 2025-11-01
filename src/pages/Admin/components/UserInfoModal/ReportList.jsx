import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../../../../utils/fetchAPI";
import { LoadingModal } from "../../../../components/LoadingModal";
import { useState } from "react";
import ReportModal from "./ReportModal";

export default function ReportList({ id }) {
  const url = "https://hcmut-study-backend.onrender.com/admin/getreportlist";
  const { data, isLoading } = useQuery({
    queryKey: ["reportlist", id],
    queryFn: async () => fetchAPI(url, "POST", { studentId: id }, true),
  });
  
  const [showReportModal, setShowReportModal] = useState(false);
  if (isLoading) return <LoadingModal />;
  const reports = data?.reports || [];
  return (
    <>
      <h5 className="font-medium text-emerald-700 mb-3 flex items-center gap-1">
        Các biên bản buổi học
      </h5>

      {reports.length === 0 ? (
        <p className="text-gray-500 italic">Trống</p>
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map((report, index) => (
            <div
              key={index}
              className="w-full p-4 bg-blue-50 rounded-xl shadow-sm hover:bg-blue-100 transition cursor-pointer"
              onClick={() =>
                setShowReportModal(true)
              }
            >
              <div className="flex justify-between items-center">
                <h6 className="font-semibold text-base">
                  {report.title}
                </h6>
                <span className="text-sm">{report.slotId}</span>
              </div>
              <p className="text-sm mt-1">
                Giảng viên: <strong>{report.tutorName}</strong>
              </p>
            </div>
          ))}
        </div>
       )}
        <ReportModal
            onOpen={showReportModal === true}
            onClose={()=>setShowReportModal(false)}
            reports={reports}
        />
    </>
  );
}
