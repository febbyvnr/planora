// import Sidebar from "../components/Sidebar";

// export default function MainLayout({ children }) {
//     return (
//         <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar />

//       <main className="flex-1 overflow-y-auto p-8">
//         {children}
//       </main>
//     </div>
//     );
// }


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
      <CTASection/>
      <Footer/>
    </>
  );
}