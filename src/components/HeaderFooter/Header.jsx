import logo from '../../assets/logo.png'
function Header(){
    return (
        <>
        <header className="header">
            <img src={logo} className="logoImg" alt="logo" />
            <div className="logo">
                <p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</p>
                <h2>TRƯỜNG ĐẠI HỌC BÁCH KHOA</h2>
            </div>
            <nav className="nav">
                <a href="#">Trang chủ</a>
                <a href="#about">Giới thiệu</a>
                <a href="#contact">Liên hệ</a>
            </nav>
        </header>
        </>
    )
}
export default Header;