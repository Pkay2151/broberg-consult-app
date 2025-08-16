import "./index.css";
// import Navbar from "./components/Nav";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import WhatWeDo from "./components/WhatWeDo"
import SomeProjects from "./SomeProjects";
import TopClient from "./TopClient";
import Services from "./components/Services";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <WhatWeDo/>
      <Services />
      <SomeProjects/>
      <TopClient/>
      <Footer />
    </>
  );
}

export default App;
