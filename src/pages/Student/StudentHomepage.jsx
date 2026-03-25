import HomepageScheduleCard from "../../components/HomepageScheduleCard"
import HomepageProfileCard from '../../features/profile/components/Homepage/HomepageProfileCard'
import {LoadingModal} from '../../components/LoadingModal'
import { useProfile } from "../../features/profile/hooks/useProfile";

export default function StudentHomepage() {
  const { data, isLoading } = useProfile();
  if (isLoading) return <LoadingModal />;
  // sessionStorage.setItem("name", data.student.name);
  // sessionStorage.setItem("phone", data.student.phone);

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 pt-10">
      <div className="w-full max-w-[900px] flex flex-col gap-6">
      {/* THÔNG TIN SINH VIÊN */}
      <HomepageProfileCard data={data} />
      {/* LỊCH HỌC */}
      <HomepageScheduleCard data={data} />
      </div>
    </div>
  );
}
