/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary : "#FFFFFF",
                secondary : "#488AEC",
                background : "#FBF9FF",
                blueButton : "#2563eb"
            },

            fontFamily: {
                outfit: ["Outfit", "sans-serif"],
            },
        },
    },
    plugins: [],
}