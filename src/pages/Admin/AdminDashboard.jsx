import { useState } from "react";
import { LayoutDashboard, Users, BookOpen } from "lucide-react";
import BanList from "./components/BanList";
import TutorList from "./components/TutorList";
import StudentList from "./components/StudentList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("tutor");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800">
      {/* Header */}
      <header className="px-10 py-5 bg-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Admin Dashboard</h1>
        </div>
        <span className="text-gray-500 text-sm">Giám sát & quản lý người dùng</span>
      </header>

      {/* Main */}
      <main className="px-10 py-5 space-y-10">
        
        {/* Tab Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all duration-300">
          {/* Tab Header */}
          <div className="flex gap-6 border-b border-gray-200 mb-6 relative">
            {[
              { key: "tutor", label: "Giảng viên", color: "text-blue-600", icon: <Users className="w-4 h-4" /> },
              { key: "student", label: "Sinh viên", color: "text-green-600", icon: <BookOpen className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative pb-3 flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key ? tab.color : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-current rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            className="transition-all duration-500 ease-in-out"
            key={activeTab}
          >
            {activeTab === "tutor" ? (
              <div>
                <TutorList />
              </div>
            ) : (
                <StudentList />
            )}
          </div>
        </div>

        {/* Ban List */}
        <section className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <div className="rounded-xl border border-gray-100 shadow-sm p-4 bg-slate-50/40">
            <BanList />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
