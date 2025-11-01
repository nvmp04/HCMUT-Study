import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, FileUp, Search, Eye, Trash, XCircle } from 'lucide-react';
import { LoadingModal } from '../../components/LoadingModal';
import { UploadModal } from '../../components/UploadModal';
import { getDocuments, deleteDocument } from '../../services/library';

function Library() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
  const id = sessionStorage.getItem("id");
  const documentsPerPage = 12;

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'Toán học', name: 'Toán học' },
    { id: 'Vật lý', name: 'Vật lý' },
    { id: 'Hóa học', name: 'Hóa học' },
    { id: 'Lập trình', name: 'Lập trình' },
    { id: 'Khác', name: 'Khác' }
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => await getDocuments()
  });

  if (isLoading) return <LoadingModal />;

  const filteredDocuments =
    data?.documents.filter(doc => {
      const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }) || [];

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
  const indexOfLast = currentPage * documentsPerPage;
  const indexOfFirst = indexOfLast - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirst, indexOfLast);

  const handleCategoryChange = category => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleDelete = async () => {
    try {
      await deleteDocument(confirmDelete.id);
      refetch();
      setConfirmDelete({ open: false, id: null });
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#1a202c] mb-2">Thư viện tài liệu</h1>
        <p className="text-[1.1rem] text-[#718096] m-0">
          Tìm kiếm và chia sẻ tài liệu học tập
        </p>
      </div>

      {/* Search and Upload */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#014181] text-white rounded-lg hover:bg-[#015181] transition"
        >
          <FileUp size={20} />
          Tải lên tài liệu
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full transition whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-[#014181] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {currentDocuments.map(doc => (
          <div
            key={doc._id}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-2 text-[#1a202c]">{doc.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{doc.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(doc.uploadDate).toLocaleDateString('vi-VN')}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(doc.fileUrl)}
                  className="flex items-center gap-1 text-[#014181] hover:text-[#015181]"
                >
                  <Eye size={18} />
                  Xem
                </button>
                {id === doc.uploadedBy && (
                  <button
                    onClick={() => setConfirmDelete({ open: true, id: doc._id })}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600"
                  >
                    <Trash size={18} />
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-[60px] px-5 text-[#718096]">
          <p className="text-[1.1rem] m-0">
            Không tìm thấy tài liệu nào phù hợp với tìm kiếm của bạn.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredDocuments.length > 0 && (
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

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => refetch()}
      />

      {/* Confirm Delete Modal */}
      {confirmDelete.open && (
        <ConfirmDeleteModal
          onClose={() => setConfirmDelete({ open: false, id: null })}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

/* 🗑️ Modal xác nhận xóa */
function ConfirmDeleteModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-[380px] w-[90%] text-center shadow-lg">
        <XCircle size={50} className="text-red-500 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Xác nhận xóa tài liệu?
        </h3>
        <p className="text-gray-600 mb-6 text-sm">
          Hành động này <strong>không thể hoàn tác</strong>.  
          Bạn có chắc chắn muốn xóa tài liệu này không?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default Library;
