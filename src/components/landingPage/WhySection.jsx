import BenefitCard from "./Card/BenefitCard";
import DotGrid from "../ReactBits/DotGrid";

export default function WhySection() {
    return (
        <section className="py-24 relative overflow-hidden rounded-b-[60px] shadow-xl">

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
            <BenefitCard
            title="Plan Your Work"
            highlight="Organize"
            description="your tasks, schedules, and study activities in one structured workspace so you always know what to do next."
            color="bg-indigo-700"
            images={[
                {
                src: "src/assets/imagesForLanding/1.png",
                className: "w-72 rotate-0"
                },
                {
                src: "src/assets/imagesForLanding/2.png",
                className: "w-60 -rotate-12 -left-10 top-10"
                }
            ]}
            />

            {/* Section 2 */}
            <BenefitCard
            title="Achieve Your Goal"
            highlight="Turn your plans into real progress"
            description="by breaking down big goals into manageable tasks and tracking your achievements."
            color="bg-red-600"
            reverse
            images={[
                {
                src: "src/assets/imagesForLanding/5.png",
                className: "w-72"
                },
                {
                src: "src/assets/imagesForLanding/4.png",
                className: "w-56 -rotate-12 top-20 left-10"
                },
                {
                src: "src/assets/imagesForLanding/3.png",
                className: "w-60 rotate-6 -top-10 -left-10"
                }
            ]}
            />

            {/* Section 3 */}
            <BenefitCard
            title="Stay Focused Daily"
            highlight="Stay on track"
            description="with built-in focus tools and study timers that help you minimize distractions and make every study session count."
            color="bg-emerald-600"
            images={[
                {
                src: "src/assets/imagesForLanding/6.png",
                className: "w-72"
                },
                {
                src: "src/assets/imagesForLanding/7.png",
                className: "w-64 -rotate-12 left-10"
                }
            ]}
            />

        </div>

        </section>
    );
}