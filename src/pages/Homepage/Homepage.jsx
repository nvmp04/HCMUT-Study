import Benefits from "./components/Benefits";
import Features from "./components/Features";
import Hero from "./components/Hero";
import About from "./components/About";

function Homepage() {
  return (
    <>
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