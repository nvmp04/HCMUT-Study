import { useState} from "react";
import { useParams } from "react-router-dom";
import { LoadingModal } from "../../components/LoadingModal";
import InfoSection from "../../features/profile/components/StudentViewTutorPage/InfoSection";
import ScheduleSection from "../../features/schedule/components/ScheduleSection";
import BookingModal from "../../features/schedule/components/BookingModal";
import AlertModal from "../../components/AlertModal";
import ScheduleConflictModal from '../../components/ScheduleConflictModal'
import { useTutorDetail } from "../../features/profile/hooks/useTutorDetail";
import { useTutorSocket } from "../../features/websocket/hooks/useTutorSocket";
import { getSuccessMessage } from "../../features/schedule/utils/generateModalContent";

function StudentViewTutorPage() {
  const { id } = useParams();
  
  const { tutor, isLoading } = useTutorDetail(id);
  useTutorSocket(id); 
  // State quản lý UI
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [modalType, setModalType] = useState(null); // null, 'booking', 'success', 'conflict'
  const [conflictData, setConflictData] = useState(null);
  const [sessionTitle, setSessionTitle] = useState("");

  if (isLoading) return <LoadingModal />;

  const closeAllModals = () => {
    setModalType(null);
    setSelectedTimeSlot(null);
    setSessionTitle("");
  };

  const handleBooking = (slot) =>{
    setSelectedTimeSlot(slot);
    setModalType('booking');
  }

  return (
    <div className="max-w-[1200px] mx-auto p-5 min-h-screen bg-gray-50 font-sans">

      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        <InfoSection tutor={tutor} />
        <ScheduleSection
          setBooking={handleBooking}
        />
      </div>

      {/* Modal Đặt lịch */}
      {modalType === 'booking' && (
        <BookingModal
          tutor={tutor}
          selectedTimeSlot={selectedTimeSlot}
          sessionTitle={sessionTitle}
          setSessionTitle={setSessionTitle}
          onConfirm={() => setModalType('success')}
          onConflict={(data) => {
            setConflictData(data);
            setModalType('conflict');
          }}
          onCancel={closeAllModals}
        />
      )}

      {/* Modal Thành công */}
      {modalType === 'success' && (()=>{
        const {title, renderMessage} = getSuccessMessage();
        return (
          <AlertModal
            title={title}
            message={renderMessage(tutor, selectedTimeSlot)}
            onClose={closeAllModals}
          />
        )
      })()}

      {/* Modal trùng lịch */}
      <ScheduleConflictModal
        open={modalType === 'conflict'}
        onClose={closeAllModals}
        title={conflictData?.title}
        name={conflictData?.tutorName}
        slotId={conflictData?.slotId}
      />
    </div>
  );
}
export default StudentViewTutorPage;