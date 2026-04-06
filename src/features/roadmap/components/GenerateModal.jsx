import { useState } from "react";
import { X, Sparkles, Brain, ArrowRight } from "lucide-react";
import AILoading from "./AILoading";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, buildAPIUrl } from "../../../config/api.config";

function GenerateModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    field: "",
    interests: "",
    level: "",
    goal: "",
    hoursPerWeek: "",
    subjectName: ""
  });

  const fields = [
    { name: "Môn học ở trường" },
    { name: "Frontend Development" },
    { name: "Backend Development" },
    { name: "Full-stack Development" },
    { name: "Mobile Development" },
    { name: "Game Development" },
    { name: "Software Engineering" },
    { name: "Data Science & AI" },
    { name: "Machine Learning" },
    { name: "Deep Learning" },
    { name: "Data Engineering" },
    { name: "Big Data" },
    { name: "DevOps & Cloud" },
    { name: "System Administration" },
    { name: "Network Engineering" },
    { name: "Cybersecurity" },
    { name: "Cloud Architecture" },
    { name: "Computer Architecture" },
    { name: "Embedded Systems" },
    { name: "IoT (Internet of Things)" },
    { name: "Hardware Engineering" },
    { name: "Robotics" }
  ];

  const generateAIPlan = async () => {
    try {
      setIsLoading(true);
      const url = buildAPIUrl(API_ENDPOINTS.ROADMAP.GOAL);
      await fetchAPI(url, "POST", formData, true);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
      queryClient.invalidateQueries(["roadmap"]);
      handleClose();
    }
  };

  const handleSubmit = () => {
    if (!formData.field || !formData.level) return;
    generateAIPlan();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setFormData({
      field: "",
      interests: "",
      level: "",
      goal: "",
      hoursPerWeek: "",
      subjectName: ""
    });
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  const isSchoolSubject = formData.field === "Môn học ở trường";

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Tạo Lộ Trình Học Tập</h2>
                <p className="text-sm text-gray-600">Cá nhân hóa lộ trình học tập với AI</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-5">
              {/* Lĩnh vực */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chọn lĩnh vực bạn muốn phát triển. *
                </label>
                <select
                  value={formData.field}
                  onChange={(e) => handleInputChange("field", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Chọn lĩnh vực --</option>
                  {fields.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nếu chọn “Môn học ở trường” → hiện input bắt buộc */}
              {isSchoolSubject ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nhập tên môn học bạn muốn học *
                  </label>
                  <input
                    type="text"
                    value={formData.subjectName}
                    onChange={(e) => handleInputChange("subjectName", e.target.value)}
                    placeholder="VD: Hệ điều hành, Cấu trúc dữ liệu và giải thuật...(hiện chỉ hỗ trợ khoa Khoa học và Kỹ thuật máy tính)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ) : (
                /* Nếu không chọn thì hiển thị “Sở thích” */
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sở thích hoặc công nghệ bạn quan tâm
                  </label>
                  <textarea
                    value={formData.interests}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                    placeholder="VD: React, Node.js, Machine Learning, Mobile App..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trình độ hiện tại *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleInputChange("level", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn trình độ</option>
                    <option value="Mới bắt đầu">Mới bắt đầu</option>
                    <option value="Trung cấp">Trung cấp</option>
                    <option value="Nâng cao">Nâng cao</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thời gian học mỗi tuần
                  </label>
                  <select
                    value={formData.hoursPerWeek}
                    onChange={(e) => handleInputChange("hoursPerWeek", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn số giờ</option>
                    <option value="5-10 giờ/tuần">5-10 giờ/tuần</option>
                    <option value="10-15 giờ/tuần">10-15 giờ/tuần</option>
                    <option value="15-20 giờ/tuần">15-20 giờ/tuần</option>
                    <option value="Hơn 20 giờ/tuần">Hơn 20 giờ/tuần</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mục tiêu của bạn là gì?
                </label>
                <textarea
                  value={formData.goal}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                  placeholder="VD: Hoàn thành dự án cá nhân, chuẩn bị phỏng vấn, nâng cao kỹ năng..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.field || !formData.level}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg"
              >
                <Brain className="w-4 h-4" />
                Tạo Lộ Trình
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <AILoading />}
    </>
  );
}

export default GenerateModal;
