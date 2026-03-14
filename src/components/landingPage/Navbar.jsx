import { useState } from "react";
import {  useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const Navigate = useNavigate();

    return (
        <header className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto px-6">

            {/* Navbar Container */}
            <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex items-center gap-3">
                <img
                src={logo}
                alt="Planora Logo"
                className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-extrabold font-['Outfit']">
                Planora Study
                </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
                <a className="text-sm font-semibold hover:text-blue-500 transition cursor-pointer">
                Features
                </a>

                <a className="text-sm font-semibold hover:text-blue-500 transition cursor-pointer">
                About
                </a>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
                <button 
                className="text-sm font-bold hover:text-blue-500 transition"
                onClick={() => Navigate("/login")}
                >
                Log in
                </button>

                <button className="px-6 py-2.5 bg-blue-500 text-white text-sm font-bold rounded-xl shadow-md hover:bg-blue-600 transition">
                Start Planning
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