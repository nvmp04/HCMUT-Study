import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../App";

import HeaderSection from "./HeaderSection";
import InfoSection from "./InfoSection";
import ScheduleSection from "./ScheduleSection";
import BookingModal from "./BookingModal";

export default function TutorReviewPage() {
  const { id } = useParams();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [sessionTitle, setSessionTitle] = useState("");

  const url = "http://localhost:5000/student/gettutordata";
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => await fetchAPI(url, "POST", { id }, true),
  });

  if (isLoading) return <LoadingModal />;

  const handleBookAppointment = () => {
    alert(
      `Đặt lịch thành công!\nTutor: ${data?.tutor.name}\nThời gian: ${selectedTimeSlot.day}, ${selectedTimeSlot.date}\nGiờ: ${selectedTimeSlot.time}`
    );
    setSelectedTimeSlot(null);
    setSessionTitle("");
  };

  return (
    <div className="max-w-[1200px] mx-auto p-5 min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <HeaderSection tutor={data?.tutor} />

      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        {/* Thông tin */}
        <InfoSection tutor={data?.tutor} />

        {/* Lịch */}
        <ScheduleSection
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
        />
      </div>

      {/* Modal đặt lịch */}
      {selectedTimeSlot && (
        <BookingModal
          tutor={data?.tutor}
          selectedTimeSlot={selectedTimeSlot}
          sessionTitle={sessionTitle}
          setSessionTitle={setSessionTitle}
          onConfirm={handleBookAppointment}
          onCancel={() => setSelectedTimeSlot(null)}
        />
      )}
    </div>
  );
}
