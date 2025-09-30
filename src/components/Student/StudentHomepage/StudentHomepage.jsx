import { useEffect, useState } from "react";
import "../../../style/StudentHomepage/studentHomepage.css"
import { Link } from "react-router-dom";

export default function StudentHomepage() {
  const student = {
    fullName: "Nguyễn Văn An",
    studentId: "2231594",
    faculty: "Kỹ thuật Máy tính",
    email: "annguyen@hcmut.edu.vn",
    role: "Sinh viên",
    status: "Đang học",
  };

  const sessions = [
  ];

  const resources = [
    { id: 1, title: "Giáo trình Giải tích 1", course: "MA101", link: "#" },
    { id: 2, title: "Slide Cấu trúc dữ liệu", course: "CS200", link: "#" },
  ];

  return (
    <>
    <div className="homepage-container">
        {/* THÔNG TIN SINH VIÊN */}
        <div className="card">
            <div className="card-header">
            <h2>THÔNG TIN SINH VIÊN</h2>
            </div>
            <div className="card-content profile-grid">
            <div>
                <p><strong>Họ tên:</strong> {student.fullName}</p>
                <p><strong>MSSV:</strong> {student.studentId}</p>
                <p><strong>Khoa:</strong> {student.faculty}</p>
                <p><strong>Email:</strong> {student.email}</p>
            </div>
            <div>
                <p><strong>Vai trò:</strong> {student.role}</p>
                <p><strong>Trạng thái:</strong> {student.status}</p>
            </div>
            </div>
        </div>
      {/* Lịch hẹn */}
        <div className="card">
            <div className="card-header row-space-between">
                <h2>LỊCH HẸN TUTOR</h2>
                <Link to='/student/schedule' className="secondary-btn">+ Đặt lịch mới</Link>
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

