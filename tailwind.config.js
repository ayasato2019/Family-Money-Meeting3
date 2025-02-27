import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {

        //卒制からのコピペで調整する
            keyframes: {
                bounceSvg: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
            },
            animation: {
                bounceSvg: 'bounceSvg 0.5s ease-in-out',
            },
            fontFamily: {
                secondry: ["DotGothic16", 'serif'],
                primary: ["Noto Sans JP", 'sans-serif'],
            },
            colors: {
                primary: '#139E9E',
                green: '#0CAA34',
                orange: '#FFA500',
                pink: '#E64C7F',
                blue: '#124FA0',
                yellow: '#FFD700',
                purple: '#6313B9',
                black: '#4F4F4F',
                darkgray: '#9D9D9D',
                gray: '#DFDFDF',
                lightgray: '#f2f2f2',
            },
            backgroundImage: {
                'gradation': 'linear-gradient(42deg, rgba(48,191,191,1) 0%, rgba(52,199,89,1) 100%)',
                'gradation-blue': 'linear-gradient(42deg, #238B9B 0%, #135BB9 100%)',
            },
        },
    },

    plugins: [forms],
};
