import Benefits from "./components/Benefits";
import NavigationBar from "../../components/HeaderFooterNav/NavigationBar";
import Features from "./components/Features";
import Hero from "./components/Hero";
import About from "./components/About";

function Homepage() {
  return (
    <>
      <NavigationBar/>
        <div className="font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] text-[#222] leading-[1.6] bg-[#f9f9f9]">
        <Hero/>
        <About/>
        <Benefits />
        <Features />
      </div>
    </>
  );
}

export default Homepage;