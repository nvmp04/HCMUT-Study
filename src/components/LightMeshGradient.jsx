// File: src/components/LightMeshGradient.jsx
import React from 'react';

const LightMeshGradient = ({ opacity = 0.6 }) => ( 
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-[#f8fafc]">
    
    {/* Primary Sky Blue - Góc trên bên trái */}
    <div 
      className="absolute -top-20 -left-20 w-[700px] h-[700px] rounded-full blur-[120px]" 
      style={{ 
        background: 'radial-gradient(circle, rgba(186, 230, 253, 0.4) 0%, transparent 80%)', 
        opacity 
      }} 
    />

    {/* Soft Indigo - Giữa trang để tạo chiều sâu */}
    <div 
      className="absolute top-1/4 -right-20 w-[800px] h-[800px] rounded-full blur-[150px]" 
      style={{ 
        background: 'radial-gradient(circle, rgba(199, 210, 254, 0.3) 0%, transparent 80%)', 
        opacity 
      }} 
    />

    {/* Cyan/Aqua - Góc dưới bên trái */}
    <div 
      className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[100px]" 
      style={{ 
        background: 'radial-gradient(circle, rgba(165, 243, 252, 0.35) 0%, transparent 80%)', 
        opacity 
      }} 
    />

    {/* Deep Sky Blue - Góc dưới bên phải */}
    <div 
      className="absolute -bottom-20 -right-20 w-[750px] h-[750px] rounded-full blur-[130px]" 
      style={{ 
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 80%)', 
        opacity 
      }} 
    />
    
    {/* Lớp phủ Grain nhẹ hoặc White Wash để làm sạch nền */}
    <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>
  </div>
);

export default LightMeshGradient;