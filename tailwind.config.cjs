/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                fadein: "fadeIn 0.4s forwards linear",
            },
            keyframes: {
                fadeIn: {
                    "0%": { width: 0 },
                    "100%": { width: "100%" },
                },
            },
        },
    },
    plugins: [],
};