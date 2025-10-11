import { useNavigate } from "react-router-dom";
import {useAuth} from '../../../hooks/useAuth'
export default function Hero(){
    const navigate = useNavigate();
    const { auth } = useAuth();
    const role = auth.role;
    async function handleLogin() {
        navigate("/login");
    }
    return (
        <section className="hero">
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] pt-8 z-0"></div>
            <div className="relative z-10 max-w-[600px] mx-auto">
            <h1 className="text-[2.2rem] mb-4 font-bold">Chương trình Tutor - HCMUT</h1>
            <p className="mx-auto ">
                Hỗ trợ sinh viên trong học tập và phát triển kỹ năng, kết nối với
                giảng viên, nghiên cứu sinh và sinh viên năm trên giàu kinh nghiệm.
            </p>
            {!auth.token && (
                <button
                onClick={handleLogin}
                className="bg-[#ffcc00] mt-1 text-[#003366] py-[0.4rem] px-[1.5rem] rounded-lg font-bold hover:bg-[#ffdb4d] transition-colors"
                >
                Đăng nhập
                </button>
            )}
            </div>
        </section>
    )
}