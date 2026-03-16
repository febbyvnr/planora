import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

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
        <header className="w-full border-b bg-white fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">

            {/* Navbar Container */}
            <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex items-center gap-3">
                <img
                src={logo}
                alt="Planora Logo"
                className="w-10 h-10 object-contain cursor-pointer"
                onClick={() => navigate("/")}
                />
                <span className="text-xl font-extrabold font-['Outfit']">
                Planora Study
                </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">

                <a 
                className="relative text-sm font-semibold cursor-pointer group hover:text-blue-500"
                onClick={() => scrollToSection("fitur")}
                >
                    Features
                    <span className="absolute left-0 -bottom-[28px] h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>

                <button 
                className="relative text-sm font-semibold cursor-pointer group hover:text-blue-500"
                onClick={() => scrollToSection("about")}
                >
                    About
                    <span className="absolute left-0 -bottom-[28px] h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </button>

            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
                <button 
                className="text-sm font-bold hover:text-blue-500 transition"
                onClick={() => navigate("/login")}
                >
                Log in
                <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </button>

                <button 
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-blue-600 transition hover:scale-105"
                onClick={() => navigate("/login")}
                >
                Sign Up
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
                </svg>
            </button>

            </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
            <div className="md:hidden border-t">
            <div className="flex flex-col gap-4 px-6 py-4">

                <a className="text-sm font-semibold">Features</a>
                <a className="text-sm font-semibold">Pricing</a>
                <a className="text-sm font-semibold">About</a>

                <hr />

                <button className="text-left font-bold">
                Log in
                </button>

                <button className="bg-blue-500 text-white py-2 rounded-lg font-bold">
                Start Planning
                </button>

            </div>
            </div>
        )}
        </header>
    );
}