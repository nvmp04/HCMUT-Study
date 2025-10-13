import { useState } from "react";
import { Star, User, BookOpen, Mail, XCircle } from "lucide-react";
import HomepageScheduleCard from "../../../components/HomepageScheduleCard";
import avt from '../../../assets/avt.jpg';
import { useQuery } from "@tanstack/react-query";
import {fetchAPI} from '../../../utils/fetchAPI'
import {LoadingModal} from '../../../App'
import HomepageProfileCard from "../../../components/HomepageProfileCard";
function TutorHomePage() {
  const url = 'http://localhost:5000/tutor/gettutordata'
  const {data, isLoading} = useQuery({
    queryKey: ['tutor'], 
    queryFn: async () => await fetchAPI(url, 'GET', null, true)
  })
  if(isLoading) return <LoadingModal/>
  const {id} = data.tutor;
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
