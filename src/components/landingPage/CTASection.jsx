import AnimatedContent from "../ReactBits/AnimatedContent";
import ShinyText from "../ReactBits/ShinyText";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function CTASection({
  badge = "Available on Web & Mobile",
  title1 = "Your Goals Deserve Better Planning.",
  title2 = "Start Planning Smarter Today.",
  description = "Join students who are organizing their study plans, collaborating with friends, and tracking their learning progress with Planora.",
  buttonText = "Start Planning With Planora?"
}) {

  const Navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-blue-600 via-blue-300 to-[#ffffff] ">

      <AnimatedContent
        distance={40}
        direction="vertical"
        duration={1.5}
        ease="power3.out"
        initialOpacity={0.3}
        animateOpacity
        threshold={0.4}
        delay={0.2}
      >

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto rounded-[3rem] bg-[#FDC21E] p-12 md:p-24 text-center overflow-hidden shadow-md shadow-amber-400"
        >

        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Glow kiri */}
          <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-orange-400 rounded-full blur-3xl opacity-40" />

          {/* Glow kanan */}
          <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-amber-400 rounded-full blur-3xl opacity-40" />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
          
            {/* Badge */}
            <div className="inline-block bg-white text-orange-400 px-6 py-2 rounded-xl shadow-md font-bold mb-8">
              {badge}
            </div>

            {/* Title */}
            <h2 className="text-white text-3xl md:text-5xl font-extrabold font-['Outfit'] leading-tight">
                {title1}
                <br />
                {title2}
            </h2>

            {/* Description */}
            <p className="text-white/90 text-lg md:text-xl mt-6">
              {description}
            </p>

            {/* Button */}
            <div className="mt-10">
              <button className="bg-white text-orange-400 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition"
              onClick={() => Navigate("/login")}
              >
                <ShinyText
                  className="inline-block"
                  text={buttonText}
                  speed={2}
                  delay={0}
                  color="#fb923c"
                  shineColor="#ffffff"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatedContent>
    </section>
  );
}