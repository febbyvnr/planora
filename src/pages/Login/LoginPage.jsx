
export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <div className="w-full max-w-lg bg-purple-50 rounded-[48px] shadow-lg p-10">

            {/* Header */}
            <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 font-['Outfit']">
                Welcome Back!
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
                Please enter your details to sign in
            </p>
            </div>

            {/* Form */}
            <form className="space-y-6">

            {/* Email */}
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

            {/* Password */}
            <div>
                <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-600">
                    Password
                </label>
                <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                >
                    Forgot Password?
                </a>
                </div>

                <input
                type="password"
                placeholder="Password"
                className="w-full h-12 px-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Login Button */}
            <button
                type="submit"
                className="w-full h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold rounded-full shadow-md"
            >
                Log In
            </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
                Or continue with
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="flex gap-4">

            <button className="flex-1 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50">
                <span className="text-sm font-semibold">Google</span>
            </button>

            <button className="flex-1 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50">
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
    );
}