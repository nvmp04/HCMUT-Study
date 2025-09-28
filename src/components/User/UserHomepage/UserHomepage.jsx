import { useEffect, useState } from "react";
import "../../../style/UserHomepage/userHomepage.css"
import UserHeader from "../UserHeader";

export default function UserHomepage() {
  const user = {
    fullName: "Nguyễn Văn An",
    studentId: "2231594",
    faculty: "Kỹ thuật Máy tính",
    email: "annguyen@hcmut.edu.vn",
    role: "Sinh viên",
    status: "Đang học",
  };

  const sessions = [
    { id: 1, topic: "Ôn thi Giải tích", date: "12/10/2025", location: "Phòng A3-201", tutor: "Thầy Nam" },
    { id: 2, topic: "Luyện đồ án Web", date: "20/10/2025", location: "Online", tutor: "Cô Mai" },
  ];

  const resources = [
    { id: 1, title: "Giáo trình Giải tích 1", course: "MA101", link: "#" },
    { id: 2, title: "Slide Cấu trúc dữ liệu", course: "CS200", link: "#" },
  ];

  return (
    <>
    <UserHeader/>
    <div className="homepage-container">
        {/* THÔNG TIN SINH VIÊN */}
        <div className="card">
            <div className="card-header">
            <h2>THÔNG TIN SINH VIÊN</h2>
            </div>
            <div className="card-content profile-grid">
            <div>
                <p><strong>Họ tên:</strong> {user.fullName}</p>
                <p><strong>MSSV:</strong> {user.studentId}</p>
                <p><strong>Khoa:</strong> {user.faculty}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div>
                <p><strong>Vai trò:</strong> {user.role}</p>
                <p><strong>Trạng thái:</strong> {user.status}</p>
            </div>
            </div>
        </div>
      {/* Lịch hẹn */}
        <div className="card">
            <div className="card-header row-space-between">
                <h2>LỊCH HẸN TUTOR</h2>
                <button className="secondary-btn">+ Đặt lịch mới</button>
            </div>
            <div className="card-content">
            {sessions.length === 0 ? (
                <p>Chưa có buổi nào được lên lịch.</p>
            ) : (
                <ul className="session-list">
                {sessions.map((s) => (
                    <li key={s.id} className="session-item">
                    <div>
                        <p className="session-topic">{s.topic}</p>
                        <p className="session-info">
                        {s.date} · {s.location} · Tutor: {s.tutor}
                        </p>
                    </div>
                    <button className="danger-btn">Hủy lịch</button>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
    </div>
    </>
  );
}

