import { useState } from 'react';
import { LoadingModal } from '../../components/LoadingModal';
import FilterBar from '../../features/profile/components/StudentViewTutorPage/FilterBar';
import TutorCard from '../../features/profile/components/shared/TutorCard';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useTutorList } from '../../features/profile/hooks/useTutorList';
import { useTutorFilter } from '../../features/profile/hooks/useTutorFilter';
import { motion, AnimatePresence } from 'framer-motion';

function StudentSchedulePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 6;

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: "Khoa Đại cương", name: 'Đại cương' },
    { id: 'Khoa học Tự nhiên', name: 'Tự nhiên' },
    { id: 'Khoa Ngoại ngữ', name: 'Ngoại ngữ' },
    { id: 'Khoa học và Kỹ thuật máy tính', name: 'CS & IT' },
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
    <div className="relative min-h-screen bg-[#0f172a] text-slate-300 font-sans overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 md:py-20">

        {/* FILTER BAR SECTION */}
        <div className="mb-12">
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* TUTOR LIST */}
        <div className="grid grid-cols-1 gap-5 mb-20">
          <AnimatePresence mode='popLayout'>
            {currentTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TutorCard tutor={tutor} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE: Mềm mại hơn */}
        {filteredTutors.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 border border-white/[0.03] rounded-[2.5rem] bg-white/[0.01]"
          >
            <div className="bg-emerald-500/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500/50">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Không tìm thấy kết quả</h3>
            <p className="text-slate-500 text-sm mt-1">Hãy thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
          </motion.div>
        )}

        {/* PAGINATION: Giảm font-black để dễ nhìn hơn */}
        {filteredTutors.length > 0 && (
          <div className="flex items-center justify-center gap-6 mt-16 border-t border-white/[0.05] pt-10">
            <button
              onClick={() => {
                  setCurrentPage(p => Math.max(p - 1, 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-400 disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={18} /> Trước
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                        setCurrentPage(i + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all border ${
                        currentPage === i + 1
                        ? 'bg-emerald-500 border-emerald-500 text-[#0f172a] shadow-lg shadow-emerald-500/20'
                        : 'border-white/[0.05] bg-white/[0.02] text-slate-500 hover:border-white/20'
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
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-emerald-400 disabled:opacity-20 transition-all"
            >
              Tiếp <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentSchedulePage;