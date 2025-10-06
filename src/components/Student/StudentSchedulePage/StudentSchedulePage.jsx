import '../../../style/StudentSchedulePage/studentSchedulePage.css'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAPI } from '../../../utils/fetchAPI';
import { LoadingModal } from '../../../App';

import FilterBar from './FilterBar';
import Card from './Card';

function StudentSchedulePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tutorsPerPage = 6;

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'Đại cương', name: 'Đại cương' },
    { id: 'Khoa học tự nhiên', name: 'Khoa học tự nhiên' },
    { id: 'Ngoại ngữ', name: 'Ngoại ngữ' },
    { id: 'Khoa học máy tính', name: 'Khoa học và kỹ thuật máy tính' },
    { id: 'Kinh tế', name: 'Kinh tế' }
  ];

  const url = 'http://localhost:5000/student/gettutorsdata';
  const { data, isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => await fetchAPI(url, 'GET', null, true)
  });

  if (isLoading) return <LoadingModal />;

  const filteredTutors = data?.tutors.filter(tutor => {
    const matchesCategory = activeCategory === 'all' || tutor.category === activeCategory;
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase())||
    tutor.subjects.some((subject)=>subject.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }) || [];

  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

  const indexOfLast = currentPage * tutorsPerPage;
  const indexOfFirst = indexOfLast - tutorsPerPage;
  const currentTutors = filteredTutors.slice(indexOfFirst, indexOfLast);

  const handleCategoryChange = (cate) => {
    setActiveCategory(cate);
    setCurrentPage(1);
  };
  const handleSearchChange = (search) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  return (
    <div className="student-schedule-page">
      <div className="page-header">
        <h1 className="page-title">Đặt lịch học với Tutor</h1>
        <p className="page-subtitle">Tìm kiếm và đặt lịch học với các giảng viên và sinh viên xuất sắc</p>
      </div>
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <div className="tutors-grid">
        {currentTutors.map(tutor => (
          <Card key={tutor.id} tutor={tutor} />
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <div className="no-results">
          <p>Không tìm thấy tutor nào phù hợp với tìm kiếm của bạn.</p>
        </div>
      )}

      {filteredTutors.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀
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
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
export default StudentSchedulePage;