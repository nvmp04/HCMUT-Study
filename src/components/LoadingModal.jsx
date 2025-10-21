export function LoadingModal() {
  return (
    <div className="fixed inset-0 bg-black/40 h-screen flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}