import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../components/LoadingModal";
import HeaderSection from "./HeaderSection";
import InfoSection from "./InfoSection";
import ScheduleSection from "./ScheduleSection";
import BookingModal from "./BookingModal";
import SuccessModal from "./SuccessModal";
import ScheduleConflictModal from '../../../components/ScheduleConflictModal'
import { useSocket } from "../../../hooks/useSocket";

function StudentViewTutorPage() {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [success, setSucess] = useState(false);
  const [booking, setBooking] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("");
  const [conflict, setConflict] = useState({state:false, tutorName: '', title: '', slotId: ''});
  const url = "https://hcmut-study-backend.onrender.com/student/gettutordata";
  const { data, isLoading } = useQuery({
    queryKey: ['tutorschedule', id],
    queryFn: async () => await fetchAPI(url, "POST", { id }, true),
  });
  useEffect(() => {
    if(!socket) return;
    function handleEvent({tutorId}){
      if(tutorId === id) queryClient.invalidateQueries(['tutorschedule', id]);
    }
    const events = ["appointment-updated", "tutorScheduleUpdated", "decline", "booksession"];
    events.forEach((e)=>socket.on(e, handleEvent))
    return () => {
      events.forEach((e)=>socket.off(e, handleEvent));
    };
  }, [queryClient, socket]);
  if (isLoading) return <LoadingModal />;

  const handleBookAppointment = () =>{
    setBooking(false);
    setSucess(true);
    setSessionTitle("");
  };
  const handleConflict = () =>{
    setBooking(false);
    setSessionTitle("");
    setSelectedTimeSlot(null);
  }
  return (
    <div className="max-w-[1200px] mx-auto p-5 min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <HeaderSection tutor={data?.tutor} />

      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        {/* Thông tin */}
        <InfoSection tutor={data?.tutor} />

        {/* Lịch */}
        <ScheduleSection
          setBooking={setBooking}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
        />
      </div>

      {/* Modal đặt lịch */}
      {booking && (
        <BookingModal
          tutor={data.tutor}
          selectedTimeSlot={selectedTimeSlot}
          sessionTitle={sessionTitle}
          setSessionTitle={setSessionTitle}
          setConflict={setConflict}
          handleConflict={handleConflict}
          onConfirm={handleBookAppointment}
          onCancel={() => {
            setBooking(false);
            setSelectedTimeSlot(null)}
          }
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
      <ScheduleConflictModal
        open={conflict.state} 
        onClose={()=>setConflict({...conflict, state:false})} 
        title={conflict.title} 
        name={conflict.tutorName}
        slotId={conflict.slotId}
      />
    </div>
  );
}
export default StudentViewTutorPage;