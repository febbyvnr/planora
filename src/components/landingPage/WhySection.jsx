import BenefitCard from "./Card/BenefitCard";
import DotGrid from "../ReactBits/DotGrid";
import AnimatedContent from "../ReactBits/AnimatedContent";

export default function WhySection() {
    return (
        <section id="fitur" className="pt-28 pb-2 relative z-20 overflow-hidden rounded-b-[40px] shadow-xl bg-[#ffffff]">

        {/* DotGrid Background */}
        <div className="absolute inset-0 -z-10">
            <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#ffffff"
            activeColor="#A16207"
            proximity={220}
            shockRadius={450}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            />
        </div>
        
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    
                    <h2 className="text-4xl md:text-5xl font-black text-yellow-700">
                        Why use Planora?
                    </h2>

                    <p className="mt-4 text-lg text-black/70 max-w-xl mx-auto">
                        Planora helps you manage tasks, schedules, and study goals in one
                        simple workspace so nothing gets forgotten.
                    </p>

                </div>

                {/* Section 1 */}
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={0.7}
                    ease="power3.out"
                    delay={0.1}
                    initialOpacity={0}
                    animateOpacity
                >
                    <BenefitCard
                    title="Plan Your Work"
                    highlight="Organize"
                    description="your tasks, schedules, and study activities in one structured workspace so you always know what to do next."
                    color="bg-indigo-700"
                    images={[
                        {
                        src: "/imagesForLanding/1.png",
                        className: "w-72 rotate-0"
                        },
                        {
                        src: "/imagesForLanding/2.png",
                        className: "w-60 -rotate-12 -left-10 top-10"
                        }
                    ]}
                    />
                </AnimatedContent>


                {/* Section 2 */}
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={0.7}
                    ease="power3.out"
                    delay={0.2}
                    initialOpacity={0}
                    animateOpacity
                >
                    <BenefitCard
                    title="Achieve Your Goal"
                    highlight="Turn your plans into real progress"
                    description="by breaking down big goals into manageable tasks and tracking your achievements."
                    color="bg-red-600"
                    reverse
                    images={[
                        {
                        src: "/imagesForLanding/5.png",
                        className: "w-72"
                        },
                        {
                        src: "/imagesForLanding/4.png",
                        className: "w-56 -rotate-12 top-20 left-10"
                        },
                        {
                        src: "/imagesForLanding/3.png",
                        className: "w-60 rotate-6 -top-10 -left-10"
                        }
                    ]}
                    />
                </AnimatedContent>


                {/* Section 3 */}
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={0.7}
                    ease="power3.out"
                    delay={0.3}
                    initialOpacity={0}
                    animateOpacity
                >
                    <BenefitCard
                    title="Stay Focused Daily"
                    highlight="Stay on track"
                    description="with built-in focus tools and study timers that help you minimize distractions and make every study session count."
                    color="bg-emerald-600"
                    images={[
                        {
                        src: "/imagesForLanding/6.png",
                        className: "w-72"
                        },
                        {
                        src: "/imagesForLanding/7.png",
                        className: "w-64 -rotate-12 left-10"
                        }
                    ]}
                    />
                </AnimatedContent>
            </div>
        </section>
    );
}