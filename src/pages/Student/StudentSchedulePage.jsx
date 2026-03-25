import { useState } from 'react';
import { LoadingModal } from '../../components/LoadingModal';
import FilterBar from '../../features/profile/components/StudentViewTutorPage/FilterBar';
import TutorCard from '../../features/profile/components/shared/TutorCard'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTutorList } from '../../features/profile/hooks/useTutorList';
import { useTutorFilter } from '../../features/profile/hooks/useTutorFilter';

function StudentSchedulePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tutorsPerPage = 6;

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
    <div className="max-w-[1200px] mx-auto p-5 font-sans">
      {/* Header */}
      <div className="text-center mt-10 mb-10">
        <h1 className="text-[2.5rem] font-bold text-[#1a202c] mb-2">Đặt lịch học với Tutor</h1>
        <p className="text-[1.1rem] text-[#718096] m-0">
          Tìm kiếm và đặt lịch học với các giảng viên và sinh viên xuất sắc
        </p>
      </div>

      {/* Bộ lọc */}
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Danh sách tutors */}
      <div className="grid justify-center grid-cols-[repeat(auto-fill,minmax(280px,350px))] gap-6 mb-10">
        {currentTutors.map(tutor => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>

      {/* Không có kết quả */}
      {filteredTutors.length === 0 && (
        <div className="text-center py-[60px] px-5 text-[#718096]">
          <p className="text-[1.1rem] m-0">
            Không tìm thấy tutor nào phù hợp với tìm kiếm của bạn.
          </p>
        </div>
      )}

      {/* Phân trang */}
      {filteredTutors.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft/>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md transition ${
                currentPage === i + 1
                  ? 'bg-[#014181] text-white font-semibold'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight/>
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentSchedulePage;
