import '../../../style/UserSchedulePage/userSchedulePage.css'
import { Search, Star, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import UserHeader from '../UserHeader'
import avt from '../../../assets/avt.jpg'
const UserSchedulePage = () => {
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
    },
    {
      id: 2,
      name: 'Trần Thị Lan',
      role: 'Sinh viên',
      major: 'Ngôn ngữ Anh',
      rating: 4.9,
      reviews: 89,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      category: 'english'
    },
    {
      id: 3,
      name: 'Lê Minh Tuấn',
      role: 'Giảng viên',
      major: 'Khoa học máy tính',
      rating: 4.7,
      reviews: 203,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      category: 'programming'
    },
    {
      id: 4,
      name: 'Phạm Thị Hoa',
      role: 'Sinh viên',
      major: 'Vật lý lý thuyết',
      rating: 4.6,
      reviews: 64,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      category: 'physics'
    },
    {
      id: 5,
      name: 'Hoàng Đức Minh',
      role: 'Giảng viên',
      major: 'Hóa học hữu cơ',
      rating: 4.8,
      reviews: 156,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      category: 'chemistry'
    },
    {
      id: 6,
      name: 'Vũ Thị Mai',
      role: 'Sinh viên',
      major: 'Kinh tế quốc tế',
      rating: 4.5,
      reviews: 78,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      category: 'economics'
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
    <UserHeader/>
    <div className="user-schedule-page">
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
export default UserSchedulePage;