import { useState } from 'react';
import { LoadingModal } from '../../components/LoadingModal';
import FilterBar from '../../features/profile/components/StudentViewTutorPage/FilterBar';
import TutorCard from '../../features/profile/components/shared/TutorCard'
import { ChevronLeft, ChevronRight, Search, Sparkles } from 'lucide-react';
import { useTutorList } from '../../features/profile/hooks/useTutorList';
import { useTutorFilter } from '../../features/profile/hooks/useTutorFilter';

function StudentSchedulePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tutorsPerPage = 5; // Giảm xuống 5 vì card ngang chiếm nhiều diện tích hơn

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: "Khoa Đại cương", name: 'Đại cương' },
    { id: 'Khoa học Tự nhiên', name: 'Khoa học tự nhiên' },
    { id: 'Khoa Ngoại ngữ', name: 'Ngoại ngữ' },
    { id: 'Khoa học và Kỹ thuật máy tính', name: 'Khoa học và kỹ thuật máy tính' },
    { id: 'Khoa Kinh tế', name: 'Kinh tế' }
  ];

  const { data, isLoading } = useTutorList();
  if (isLoading) return <LoadingModal />;

  const filteredTutors = useTutorFilter(data.tutors, activeCategory, searchTerm);

  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);
  const indexOfLast = currentPage * tutorsPerPage;
  const indexOfFirst = indexOfLast - tutorsPerPage;
  const currentTutors = filteredTutors.slice(indexOfFirst, indexOfLast);

  const handleCategoryChange = cate => {
    setActiveCategory(cate);
    setCurrentPage(1);
  };

  const handleSearchChange = search => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-8 min-h-screen bg-transparent font-sans relative z-10">
      
      <div className="text-center mt-8 mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50/50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100/50 backdrop-blur-sm">
          <Sparkles size={14} /> Khám phá tri thức
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Tìm kiếm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Gia sư phù hợp</span>
        </h1>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium">
          Học tập 1-1 cùng đội ngũ giảng viên và sinh viên ưu tú nhất từ các khoa.
        </p>
      </div>

      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* DANH SÁCH TUTORS: Chuyển hoàn toàn sang Flex-Col (Dạng List) */}
      <div className="flex flex-col gap-6 mb-12">
        {currentTutors.map(tutor => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>

      {/* TRẠNG THÁI TRỐNG */}
      {filteredTutors.length === 0 && (
        <div className="text-center py-20 bg-white/30 backdrop-blur-md rounded-[3rem] border border-dashed border-slate-300">
          <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search size={32} />
          </div>
          <p className="text-lg font-bold text-slate-800 m-0">
            Hệ thống không tìm thấy tutor nào...
          </p>
          <p className="text-slate-500 text-sm mt-1">Hãy thử thay đổi từ khóa hoặc khoa khác nhé!</p>
        </div>
      )}

      {/* PHÂN TRANG (PAGINATION) */}
      {filteredTutors.length > 0 && (
        <div className="flex items-center justify-center gap-3 mt-12 pb-10">
          <button
            onClick={() => {
                setCurrentPage(p => Math.max(p - 1, 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-md text-slate-600 hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white shadow-sm transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white shadow-sm">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                key={i}
                onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    currentPage === i + 1
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 scale-110'
                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                }`}
                >
                {i + 1}
                </button>
            ))}
          </div>

          <button
            onClick={() => {
                setCurrentPage(p => Math.min(p + 1, totalPages));
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-md text-slate-600 hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white shadow-sm transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentSchedulePage;