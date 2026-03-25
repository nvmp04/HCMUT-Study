import { useTutorList } from "./useTutorList";

export function useTutorDetail(id){
    const {data, isLoading} = useTutorList();
    const tutor = data?.tutors.find(tutor=> tutor.id === id);
    return {tutor, isLoading};
}