import { Search, SlidersHorizontal, Star, DollarSign, Users, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[1000px] mx-auto mb-16 p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="flex flex-col gap-6">
        
        {/* HÀNG 1: SEARCH & CATEGORY */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Ô Tìm kiếm */}
          <div className="relative flex-[2] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Tìm tên môn, mã học phần hoặc gia sư..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-[#050810]/50 border border-white/5 rounded-2xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Dropdown Khoa */}
          <div className="relative flex-1">
            <select 
              value={activeCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full appearance-none px-6 py-4 bg-[#050810]/50 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 focus:outline-none focus:border-emerald-500/50 cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-[#0f172a] text-slate-300">
                  KHOA: {cat.name.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
          </div>
        </div>

        {/* KHU VỰC BỘ LỌC (HIỆN SẴN) */}
        <div className="pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Lọc theo Học phí */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-500">
              <DollarSign size={14} className="text-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-widest">Khoảng học phí</span>
            </div>
            <div className="relative">
              <select className="w-full appearance-none bg-[#050810]/50 border border-white/5 rounded-xl px-4 py-3 text-xs text-slate-300 outline-none focus:border-emerald-500/30 cursor-pointer">
                <option className="bg-[#0f172a]">Tất cả mức giá</option>
                <option className="bg-[#0f172a]">Dưới 150k / giờ</option>
                <option className="bg-[#0f172a]">150k - 300k / giờ</option>
                <option className="bg-[#0f172a]">Trên 300k / giờ</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={12} />
            </div>
          </div>

          {/* Lọc theo Đánh giá */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-500">
              <Star size={14} className="text-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-widest">Đánh giá tối thiểu</span>
            </div>
            <div className="flex gap-2">
              {[3, 4, 5].map(star => (
                <button key={star} className="flex-1 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[10px] font-bold text-slate-400 hover:border-emerald-500/50 hover:text-emerald-500 transition-all">
                  {star} SAO +
                </button>
              ))}
            </div>
          </div>

          {/* Lọc theo Đối tượng */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-500">
              <Users size={14} className="text-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-widest">Đối tượng gia sư</span>
            </div>
            <div className="relative">
              <select className="w-full appearance-none bg-[#050810]/50 border border-white/5 rounded-xl px-4 py-3 text-xs text-slate-300 outline-none focus:border-emerald-500/30 cursor-pointer">
                <option className="bg-[#0f172a]">Tất cả</option>
                <option className="bg-[#0f172a]">Sinh viên ưu tú</option>
                <option className="bg-[#0f172a]">Giảng viên</option>
                <option className="bg-[#0f172a]">Nam gia sư</option>
                <option className="bg-[#0f172a]">Nữ gia sư</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={12} />
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}