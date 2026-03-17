
import logo from '../../../assets/logo.png';
export function LoginMethodModal({setLoginMethod}){
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f5] flex flex-col items-center"> <div className="flex flex-col items-center bg-white mt-16 p-8 rounded-xl shadow-lg w-[480px] box-border"> <img src={logo} alt="Logo" className="w-[150px] mb-4" />
            <div className="flex flex-col gap-[3px] w-full pt-[30px] pb-[30px] border-t border-b border-[#e0dfdf]">
                <h2 className="text-xl text-[#0c4a6e]">Log in using your account on:</h2>
                <div
                onClick={()=>setLoginMethod('user')}
                className="flex justify-center w-full border border-[#e0dfdf] rounded-md py-[10px] px-[10px] box-border hover:cursor-pointer mt-2"
                >
                <img src={logo} alt="Logo" className="mt-[5px] mr-[2px] h-[20px] w-[20px]" />
                <span className="lp-option-text">Tài khoản HCMUT (HCMUT account)</span>
                </div>
                <div
                onClick={()=>setLoginMethod('admin')}
                className="flex justify-center w-full border border-[#e0dfdf] rounded-md py-[10px] px-[10px] box-border hover:cursor-pointer mt-2"
                >
                <span className="lp-option-text">Admin</span>
                </div>
            </div>

            <div className="flex gap-8 mt-8 w-full">
                <div className="flex justify-center items-center text-gray-600 cursor-pointer text-[0.95rem]">
                <span>English (en)</span>
                <span className="ml-1">▼</span>
                </div>
                <button className="bg-[#0c4a6e] text-white border-none py-[0.8rem] px-[1.2rem] rounded-md text-base cursor-pointer">
                Cookies notice
                </button>
            </div>
            </div>
        </div>
        </>
    )
}