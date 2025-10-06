import { Search } from "lucide-react";

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="w-full flex flex-col items-center mb-10">
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-5 py-2.5 text-sm font-medium rounded-full border-2 transition ${
              activeCategory === category.id
                ? "bg-[#014181] border-[#014181] text-white shadow-md"
                : "bg-white border-gray-200 text-gray-700 hover:border-[#014181] hover:text-[#014181] hover:-translate-y-0.5"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="w-full max-w-xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm tutor hoặc môn học..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#014181] transition"
        />
      </div>
    </div>
  );
}
