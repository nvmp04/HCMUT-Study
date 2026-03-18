import HomepageScheduleCard from "../../../components/HomepageScheduleCard";
import {LoadingModal} from '../../../components/LoadingModal'
import HomepageProfileCard from "../../../components/HomepageProfileCard";
import { useProfile } from "../../../features/profile/hooks/useProfile";
function TutorHomePage() {
  const {data, isLoading} = useProfile();
  if(isLoading) return <LoadingModal/>
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 pt-10">
      <div className="w-full max-w-[900px] flex flex-col gap-6">
        {/* THÔNG TIN GIẢNG VIÊN */}
        <HomepageProfileCard data={data} />
        {/* LỊCH DẠY */}
        <HomepageScheduleCard data={data} />
      </div>
    </div>
  );
}

export default TutorHomePage;
