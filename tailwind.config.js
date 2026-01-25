/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    600: '#2563eb', // Matches the logo/brand color in reference
                    700: '#1d4ed8',
                    800: '#1e40af',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
