import FeatureCard from "./Card/WhatIsCard";
import AnimatedContent from "../ReactBits/AnimatedContent";

import {
    FileText,
    Timer,
    BarChart3,
    Users,
    CheckSquare,
    Calendar
} from "lucide-react";

    export default function Features() {

    const features = [
        {
        title: "Material Storage",
        description:
            "Securely store and access your study notes and documents from any device.",
        icon: <FileText />,
        iconBg: "bg-gray-200",
        iconColor: "text-gray-700"
        },
        {
        title: "Study Timer",
        description:
            "Boost focus using our integrated Pomodoro style timer.",
        icon: <Timer />,
        iconBg: "bg-red-100",
        iconColor: "text-red-500"
        },
        {
        title: "Weekly Progress Graph",
        description:
            "Visualize your growth with detailed weekly performance insights and reports.",
        icon: <BarChart3 />,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-500"
        },
        {
        title: "Collaborative Planner",
        description:
            "Plan session with friends and sync schedules effortlessly.",
        icon: <Users />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-500"
        },
        {
        title: "Smart Task Management",
        description:
            "Stay on top of deadlines with intelligent prioritization.",
        icon: <CheckSquare />,
        iconBg: "bg-red-100",
        iconColor: "text-red-400"
        },
        {
        title: "Study Activity Organizer",
        description:
            "Categorize and track all your academic activities.",
        icon: <Calendar />,
        iconBg: "bg-green-100",
        iconColor: "text-green-500"
        }
    ];

    const rotations = [
        "-rotate-3",
        "rotate-2",
        "-rotate-2",
        "rotate-2",
        "-rotate-2",
        "rotate-3"
    ];

    return (
        <section id="about" className="relative pt-32 pb-24 -mt-8 bg-gradient-to-b from-[#4C27B2] to-[#46269d] rounded-b-[50px]">

        <div className="max-w-7xl mx-auto px-6">

            {/* Heading */}
            <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.7}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            delay={0.2}
            >
            <div className="text-center text-white mb-8">
                <h2 className="text-4xl md:text-5xl font-bold font-['Outfit']">
                    What is Planora?
                </h2>
            </div>
            </AnimatedContent>

            <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={0.7}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            delay={0.2}
            >
            <div className = "text-center text-white mb-24">
                <p className="text-xl font-semibold mt-4">
                    Plan, organize, collaborate, and track your progress in one platform.
                </p>
            </div>
            </AnimatedContent>

            {/* Cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {features.map((feature, index) => (

                <AnimatedContent
                key={index}
                distance={100}
                direction="vertical"
                duration={0.7}
                ease="power3.out"
                delay={index * 0.1}
                initialOpacity={0}
                animateOpacity
                >

                <FeatureCard
                    {...feature}
                    rotation={rotations[index]}
                />

                </AnimatedContent>

            ))}

            </div>

        </div>

        </section>
    );
}