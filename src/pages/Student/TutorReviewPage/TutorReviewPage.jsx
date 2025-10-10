import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../App";
import io from "socket.io-client";
import HeaderSection from "./HeaderSection";
import InfoSection from "./InfoSection";
import ScheduleSection from "./ScheduleSection";
import BookingModal from "./BookingModal";
import SuccessModal from "./SuccessModal";

const socket = io("http://localhost:5000");
export default function TutorReviewPage() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [success, setSucess] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("");
  const url = "http://localhost:5000/student/gettutordata";
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => await fetchAPI(url, "POST", { id }, true),
  });
  useEffect(() => {
    function handleEvent({tutorId}){
      if(tutorId === id) queryClient.invalidateQueries([id]);
    }
    const events = ["tutorScheduleUpdated", "decline"];
    events.forEach((e)=>socket.on(e, handleEvent))
    return () => {
      events.forEach((e)=>socket.off(e, handleEvent));
      socket.disconnect();
    };
  }, [queryClient]);
  if (isLoading) return <LoadingModal />;

  const handleBookAppointment = () => {
    setSucess(true);
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
          tutor={data.tutor}
          selectedTimeSlot={selectedTimeSlot}
          sessionTitle={sessionTitle}
          setSessionTitle={setSessionTitle}
          onConfirm={handleBookAppointment}
          onCancel={() => setSelectedTimeSlot(null)}
        />
      )}
      {success && 
        <SuccessModal
        tutor={data.tutor}
        timeSlot={selectedTimeSlot}
        onClose={()=>{
          setSucess(false);
          setSelectedTimeSlot(null);
        }}
        />}
    </div>
  );
}
