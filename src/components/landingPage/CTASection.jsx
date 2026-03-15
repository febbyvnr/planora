    import AnimatedContent from "../ReactBits/AnimatedContent";
    import ScrollFloat from "../ReactBits/ScrollFloat";

    export default function CTASection({

    badge = "Available on Web & Mobile",
    title1 = "Your Goals Deserve Better Planning.",
    title2 = "Start Planning Smarter Today.",
    description = "Join students who are organizing their study plans, collaborating with friends, and tracking their learning progress with Planora.",
    buttonText = "Start Planning With Planora?"
    }) {
    
        return (
        <section className="py-16">
            <AnimatedContent
                distance={40}
                direction="vertical"
                reverse={false}
                duration={1.5}
                ease="power3.out"
                initialOpacity={0.3}
                animateOpacity
                scale={1}
                threshold={0.4}
                delay={0.2}
            > 
            <div className="max-w-6xl mx-auto px-6">

                {/* Container */}
                <div className="relative rounded-[50px] overflow-hidden text-center px-6 py-24 shadow-2xl bg-blue-500">

                    {/* Background */}
                    {/* <img
                        src="src/assets/textures/Dots Blue.png"
                        alt="CTA background"
                        className="absolute inset-0 w-full h-full object-cover -z-10"
                    /> */}

                    {/* Badge */}
                    <div className="inline-block bg-white text-blue-500 px-6 py-2 rounded-xl shadow-md font-bold mb-8">
                        {badge}
                    </div>

                    {/* Title */}
                    <h2 className="text-white text-3xl md:text-5xl font-extrabold font-['Outfit'] leading-tight">
                        {title1}
                        <br />
                        {title2}
                    </h2>

                    {/* Description */}
                    <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mt-6">
                        {description}
                    </p>

                    {/* Button */}
                    <div className="mt-10">
                        <button className="bg-white text-blue-500 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition">
                        {buttonText}
                        </button>
                    </div>
                </div>
            </div>
            </AnimatedContent>
        </section>
    );
    }