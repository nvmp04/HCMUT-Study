import { useState } from "react";
import { Plus} from "lucide-react";
import GenerateModal from "./components/GenerateModal";
import Roadmap from "./components/Roadmap";

function StudentAIpage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="max-w-7xl mx-auto p-5 min-h-screen bg-gray-50 font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            Lộ trình học tập
          </h1>
          <p className="text-gray-600">Lộ trình học tập được cá nhân hóa bởi AI (hiện chỉ hỗ trợ khoa Khoa học và Kỹ thuật máy tính)</p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Tạo Lộ Trình Mới
        </button>
      </div>

      <Roadmap/>

      <GenerateModal
        isOpen={showModal}
        onClose={()=>setShowModal(false)}
      />
    </div>
  );
}

export default StudentAIpage;