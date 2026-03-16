import { UserRound, Phone, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import StickerPeel from "../../components/ReactBits/StickerPeel";
import Navbar from "../../components/landingPage/Navbar";

import sticker6 from "../../assets/images/sticker_6.png";
import sticker7 from "../../assets/images/materials-delete.png";
import sticker4 from "../../assets/images/sticker_4.png";
import sticker5 from "../../assets/images/sticker_5.png";

export default function LoginPage() {
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
        setIsMobile(window.innerWidth < 768);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const stickerSize = isMobile ? 110 : 200;
    const posRight = isMobile ? 120 : 500;
    const posLeft = isMobile ? -120 : -500;

    return (
        <>
        {/* Navbar hanya tampil di tablet & desktop */}
        <div className="hidden md:block">
            <Navbar />
        </div>

        {/* Mobile Back Button */}
        <div className="md:hidden absolute top-6 left-4 z-50">
            <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition"
            >
            <ArrowLeft size={22} />
            </button>
        </div>

        <div className="min-h-screen flex items-center justify-center bg-[#FBF9FF] px-4 md:mt-4">

            <StickerPeel
            imageSrc={sticker6}
            width={stickerSize}
            rotate={0}
            peelBackHoverPct={30}
            peelBackActivePct={40}
            shadowIntensity={0.5}
            lightingIntensity={0.1}
            initialPosition={{ x: posRight, y: -200 }}
            peelDirection={0}
            />

            <StickerPeel
            imageSrc={sticker7}
            width={stickerSize}
            rotate={0}
            peelBackHoverPct={30}
            peelBackActivePct={40}
            shadowIntensity={0.5}
            lightingIntensity={0.1}
            initialPosition={{ x: posLeft, y: -200 }}
            peelDirection={0}
            />

            <StickerPeel
            imageSrc={sticker4}
            width={stickerSize}
            rotate={0}
            peelBackHoverPct={30}
            peelBackActivePct={40}
            shadowIntensity={0.5}
            lightingIntensity={0.1}
            initialPosition={{ x: posLeft, y: 100 }}
            peelDirection={0}
            />

            <StickerPeel
            imageSrc={sticker5}
            width={stickerSize}
            rotate={0}
            peelBackHoverPct={30}
            peelBackActivePct={40}
            shadowIntensity={0.5}
            lightingIntensity={0.1}
            initialPosition={{ x: posRight, y: 100 }}
            peelDirection={0}
            />

            <div className="relative w-full max-w-md md:max-w-lg bg-white rounded-[48px] shadow-lg p-8 md:p-10">

            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Outfit']">
                Welcome Back!
                </h1>
                <p className="text-gray-500 mt-3 text-base md:text-lg">
                Please enter your details to sign in
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5 md:space-y-6">

                <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-12 px-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-600">
                    Password
                    </label>
                    <a className="text-sm text-gray-600 hover:text-blue-500">
                    Forgot Password?
                    </a>
                </div>

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-12 px-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <button
                type="button"
                className="w-full h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold rounded-full shadow-md"
                onClick={() => navigate("/dashboard")}
                >
                Log In
                </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6 md:my-8">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                Or continue with
                </span>
                <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="flex gap-4">
                <button className="flex-1 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50">
                <UserRound />
                <span className="text-sm font-semibold">Google</span>
                </button>

                <button className="flex-1 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50">
                <Phone />
                <span className="text-sm font-semibold">Phone Number</span>
                </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 text-sm">
                <span className="text-gray-500">
                Don't have an account?{" "}
                </span>
                <a className="font-semibold text-gray-800 hover:text-blue-500">
                Sign up
                </a>
            </div>

            </div>
        </div>
        </>
    );
}