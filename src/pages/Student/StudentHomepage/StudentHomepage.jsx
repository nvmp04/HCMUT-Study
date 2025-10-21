import { useQuery } from "@tanstack/react-query";
import HomepageScheduleCard from "../../../components/HomepageScheduleCard";
import { fetchAPI } from "../../../utils/fetchAPI";
import HomepageProfileCard from "../../../components/HomepageProfileCard";
import {LoadingModal} from '../../../components/LoadingModal' 

export default function StudentHomepage() {
  const url = "http://localhost:5000/student/getstudentdata";
  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => await fetchAPI(url, "GET", null, true),
  });

  if (isLoading) return <LoadingModal />;
  sessionStorage.setItem("name", data.student.name);
  sessionStorage.setItem("phone", data.student.phone);

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
