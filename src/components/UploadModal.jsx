import { useState } from 'react';
import { X, Paperclip } from 'lucide-react';
import { uploadDocument } from '../services/library';
import { useQueryClient } from '@tanstack/react-query';

export const UploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const queryClient = useQueryClient();

  const categories = [
    { id: 'Toán học', name: 'Toán học' },
    { id: 'Vật lý', name: 'Vật lý' },
    { id: 'Hóa học', name: 'Hóa học' },
    { id: 'Lập trình', name: 'Lập trình' },
    { id: 'Khác', name: 'Khác' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('file', file);

      await uploadDocument(formData);

      queryClient.invalidateQueries(['documents']);

      setTitle('');
      setDescription('');
      setCategory('');
      setFile(null);

      onSuccess?.();
      onClose();
    } catch (error) {
      setError(error.message || 'Có lỗi xảy ra khi tải lên tài liệu');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tải lên tài liệu</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom file input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File PDF
              </label>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-[#014181] text-white rounded-md hover:bg-[#015181] transition text-sm font-medium"
                >
                  <Paperclip size={16} />
                  {file ? 'Thay đổi file' : 'Chọn file'}
                </label>

                <span className="text-gray-700 text-sm truncate max-w-[220px]">
                  {file ? file.name : 'Chưa chọn file'}
                </span>
              </div>

              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-[#014181] text-white rounded-md hover:bg-[#015181] transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Đang tải lên...' : 'Tải lên'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
