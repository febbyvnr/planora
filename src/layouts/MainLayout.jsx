import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";
import Hero from "../components/landingPage/HeroSection";
import WhatIsSection from "../components/landingPage/WhatIsSection";
import WhySection from "../components/landingPage/WhySection";
import CTASection from "../components/landingPage/CTASection";

export default function MainLayout () {
  return (
    <>
      <Navbar/>
      <Hero/>
      <WhatIsSection/>
      <WhySection/>
      <WhySection/>
      <Footer/>
    </>
  );
}