import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";
import Hero from "../components/landingPage/HeroSection";
import WhatIsSection from "../components/landingPage/WhatIsSection";
import WhySection from "../components/landingPage/WhySection";
import ReviewSection from "../components/landingPage/ReviewSection";
import CTASection from "../components/landingPage/CTASection";

export default function LandingPage() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <WhatIsSection/>
      <WhySection/>
      <ReviewSection/>
      <CTASection/>
      <Footer/>
    </>
  );
}
