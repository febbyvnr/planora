    import BenefitCard from "./Card/BenefitCard";

    export default function WhySection() {
    return (
        <section className="py-24 relative rounded-b-[60px] shadow-xl">

        {/* Background */}
        <div className="absolute inset-0 -z-10">
            <img
            src="src/assets/textures/Dots.jpg"
            alt="Background"
            className="w-full h-full object-cover rounded-[60px] opacity-25"
            />
        </div>

        <div className="max-w-7xl mx-auto px-6">

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
                src: "https://placehold.co/377x269",
                className: "w-72 rotate-0"
                },
                {
                src: "https://placehold.co/312x223",
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
                src: "https://placehold.co/408x290",
                className: "w-72"
                },
                {
                src: "https://placehold.co/277x197",
                className: "w-56 -rotate-12 top-20 left-10"
                },
                {
                src: "https://placehold.co/301x215",
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
                src: "https://placehold.co/335x239",
                className: "w-72"
                },
                {
                src: "https://placehold.co/339x241",
                className: "w-64 -rotate-12 left-10"
                }
            ]}
            />

        </div>
        </section>
    );
    }