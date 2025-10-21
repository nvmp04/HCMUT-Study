import React from "react";

const StatCard = ({ icon: Icon, label, value, color = "blue" }) => {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
    red: "text-red-600 bg-red-50",
  };

  return (
    <div className="flex items-center justify-between bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-3xl font-semibold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        <Icon className={`w-6 h-6 ${colors[color].split(" ")[0]}`} />
      </div>
    </div>
  );
};

export default StatCard;
