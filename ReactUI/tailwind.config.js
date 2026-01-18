/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'melete-bold': ['Melete-Bold'],
                'melete-medium': ['Melete-Medium'],
            },
        },
    },
    plugins: [],
}