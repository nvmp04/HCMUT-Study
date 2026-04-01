import Benefits from "./components/Benefits";
import Features from "./components/Features";
import Hero from "./components/Hero";
import About from "./components/About";
import ScrollProgressBar from "./components/ScrollProgressBar";

function Homepage() {
  return (
    <>
      <ScrollProgressBar />
      <main>
        <Hero />
        <About />
        <Benefits />
        <Features />
      </main>
    </>
  );
}

export default Homepage;