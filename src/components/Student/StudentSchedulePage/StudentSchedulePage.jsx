import '../../../style/StudentSchedulePage/studentSchedulePage.css'
import { Search, Star, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import avt from '../../../assets/avt.jpg'
function StudentSchedulePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'math', name: 'Toán đại cương' },
    { id: 'physics', name: 'Khoa học tự nhiên'},
    { id: 'english', name: 'Ngoại ngữ' },
    { id: 'programming', name: 'Khoa học và kỹ thuật máy tính' },
    { id: 'economics', name: 'Kinh tế' }
  ];

  const tutors = [
    {
      id: 1,
      name: 'Nguyễn Văn Nam',
      role: 'Giảng viên',
      major: 'Toán học ứng dụng',
      rating: 4.8,
      reviews: 127,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      category: 'math'
    }
  ];

  const filteredTutors = tutors.filter(tutor => {
    const matchesCategory = activeCategory === 'all' || tutor.category === activeCategory;
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.major.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  return (
    <>
    <div className="student-schedule-page">
      <div className="page-header">
        <h1 className="page-title">Đặt lịch học với Tutor</h1>
        <p className="page-subtitle">Tìm kiếm và đặt lịch học với các giảng viên và sinh viên xuất sắc</p>
      </div>

      {/* Navigation Categories */}
      <div className="categories-nav">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm tutor hoặc môn học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tutors List */}
      <div className="tutors-grid">
        {filteredTutors.map(tutor => (
          <div key={tutor.id} className="tutor-card">
            <div className="tutor-avatar">
              <img src={avt} alt={tutor.name} />
              <div className="role-badge">
                <User size={12} />
                {tutor.role}
              </div>
            </div>
            
            <div className="tutor-info">
              <h3 className="tutor-name">{tutor.name}</h3>
              <p className="tutor-major">{tutor.major}</p>
              
              <div className="tutor-rating">
                <div className="rating-stars">
                  <Star className="star filled" size={16} />
                  <span className="rating-number">{tutor.rating}</span>
                </div>
                <span className="reviews-count">({tutor.reviews} đánh giá)</span>
              </div>
            </div>
            
            <div className="tutor-actions">
              <button 
                className="book-btn"
              >
                <Calendar size={16} />
                Đặt lịch
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <div className="no-results">
          <p>Không tìm thấy tutor nào phù hợp với tìm kiếm của bạn.</p>
        </div>
      )}
    </div>
    </>
  );
};
export default StudentSchedulePage;