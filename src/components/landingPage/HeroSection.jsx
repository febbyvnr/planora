import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DotGrid from "../ReactBits/DotGrid";
import RotatingText from "../ReactBits/RotatingText";
import ShinyText from "../ReactBits/ShinyText";
    

export default function Hero() {
    const Navigate = useNavigate();

    const scrollToSection = (id) => {
        // kalau bukan di homepage → pindah dulu
        if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: id } });
        } else {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full overflow-hidden rounded-b-[40px] shadow-2xl z-10 bg-white">

        {/* Background
        <div className="absolute inset-0 -z-10">
            <img
            src= "src/assets/textures/Dots.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-25"
            />  
        </div> */}

        {/* Dotgrid Background*/}
        <div className="absolute inset-0 -z-10">
            <DotGrid
                dotSize={15}
                gap={15}
                baseColor="#ffffff"
                activeColor="#2078fa"
                proximity={120}
                shockRadius={250}
                shockStrength={5}
                resistance={750}
                returnDuration={1.5}
            />
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-48 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#4c27b2] text-white px-6 py-2 rounded-full shadow-md border border-white/20 mb-8">
                <Rocket className="w-4 h-4 text-white" />
                <ShinyText
                className="text-sm font-bold tracking-wide uppercase"
                text=" Organize your academic life"
                speed={2}
                delay={0}
                color="#ffffff"
                shineColor="#a686fe"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                >                        
                </ShinyText>
            </div>

            {/* Title */}
            <h1 className="font-outfit leading-tight">

            <div className="text-3xl md:text-5xl lg:text-6xl font-bold">
                Stop Planning in{" "}
            <RotatingText
                texts={['Chaos!', 'Clutter!', 'Confusion!', 'Mess!']}
                mainClassName="text-3xl md:text-5xl lg:text-6xl px-2 md:px-3 bg-rose-600 text-white overflow-hidden py-1 md:py-2 rounded-lg font-['Patrick_Hand_SC'] font-normal"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
            />
            </div>

            <div className="text-4xl md:text-6xl lg:text-7xl font-extrabold mt-2">
                <span className="text-blue-500">Start Planning with </span>
                <ShinyText
                className="text-emerald-600 underline decoration-4 underline-offset-4"
                text="Planora"
                speed={2}
                delay={0}
                color="#009053"
                shineColor="#6af0b9"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                >
                </ShinyText>
                
            </div>

            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-l text-gray-500 font-semibold max-w-xl mx-auto">
            “All your plans, assignments, and learning collaborations in one neat system.”
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <button 
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:scale-105 transition"
            onClick={() => Navigate("/login")}
            >
                Start Planning
            </button>

            <button 
            className="px-8 py-3 bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:scale-105 transition"
            onClick={() => scrollToSection("about")}
            >
                View Features
            </button>

            </div>

        </div>
        </section>
    );
}

                