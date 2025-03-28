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
                secondary: ["DotGothic16", 'serif'],
                primary: ["Noto Sans JP", 'sans-serif'],
            },
            colors: {
                primary: {
                    100: '#B3E6E6',
                    200: '#8CD9D9',
                    300: '#66CCCC',
                    400: '#40BFBF',
                    500: '#139E9E',
                    600: '#118C8C',
                    700: '#0E7979',
                    800: '#0C6565',
                    900: '#0B5050',
                },
                green: {
                    100: '#B8F5CC',
                    200: '#94EEB0',
                    300: '#70E894',
                    400: '#4CE278',
                    500: '#0CAA34',
                    600: '#0B982F',
                    700: '#09762A',
                    800: '#076025',
                    900: '#054B1F',
                },
                blue: {
                    100: '#A3C3EE',
                    200: '#85AEE8',
                    300: '#6899E2',
                    400: '#4A84DC',
                    500: '#124FA0',
                    600: '#10468F',
                    700: '#0D3C7D',
                    800: '#0A336A',
                    900: '#072957',
                },
            },
            backgroundImage: {
                'gradation': 'linear-gradient(42deg, rgba(48,191,191,1) 0%, rgba(52,199,89,1) 100%)',
                'gradation-blue': 'linear-gradient(42deg, #238B9B 0%, #135BB9 100%)',
                'header-dark': 'linear-gradient(90deg, #124FA0 0%, #139E9E 100%)',
                'header-light': 'linear-gradient(90deg, #B8F5CC 0%, #48BFBF 100%)',
            }
        }
    },
    plugins: [forms],
};
