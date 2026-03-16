import logo from "../../assets/images/logo.png";


export default function Footer() {

    return (
        <div className="w-full bg-[#047857] rounded-t-[50px] py-8">
        <div className="max-w-7xl mx-auto px-2 flex flex-col gap-10">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between gap-10">

            {/* Logo + Description */}
            <div className="flex flex-col gap-4 max-w-sm">
                <div className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="logo"
                    className="w-10 h-auto"
                />
                <h1 className="text-white text-3xl md:text-4xl font-black font-['Outfit']">
                    Planora
                </h1>
                </div>

                <p className="text-white text-2xl md:text-base font-normal leading-tight">
                Ready to plan smarter this with Planora?
                </p>
            </div>

            {/* Links Section */}
            <div className="flex gap-12">

                {/* Product */}
                <div className="flex flex-col gap-4">
                <h2 className="text-white text-lg md:text-xl font-bold">
                    Product
                </h2>
                <div className="text-white text-sm space-y-2">
                    <p>Features</p>
                    <p>Smart Scheduling</p>
                    <p>Study Streak</p>
                    <p>Collaboration</p>
                    <p>Progress Tracking</p>
                </div>
                </div>

                {/* Support */}
                <div className="flex flex-col gap-4">
                <h2 className="text-white text-lg md:text-xl font-bold">
                    Support
                </h2>
                <div className="text-white text-sm space-y-2">
                    <p>Help Center</p>
                    <p>Community</p>
                    <p>Contact</p>
                </div>
                </div>

            </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center border-t border-white/20 pt-6">
            <p className="text-white text-sm font-medium">
                © 2026 Planora. All rights reserved.
            </p>
            </div>

        </div>
        </div>
    );
}