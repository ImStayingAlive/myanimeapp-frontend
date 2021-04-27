module.exports = {
    purge: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/layout/**/*.{js,ts,jsx,tsx}",
        "./src/layout/**/**/*.{js,ts,jsx,tsx}",
        "./src/layout/**/**/**/*.{js,ts,jsx,tsx}",
        "./src/layout/**/**/**/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            padding: '2rem',
        },
        extend: {
            colors: {
                richBlack: '#000814',
                oxfordBlue: '#001D3D',
                prussianBlue: '#003566',
                darkGray: '#1c1d1f',
                richGray: '#191a1c',
                royalBlue: '#0d2f6d',
                dropDownDark: '#242426',
                dropDownLight: '#3b3a3d',
                dropDownHoverLight: '#4d4f51'
            },
            keyframes: {
                coverFade: {
                    '0%': {
                        backgroundPosition: 'right'
                    },
                    '100%': {
                        backgroundPosition: 'left'
                    },
                }
            },
            animation: {
                wiggle: 'coverFade 5s linear ',
            },
        },
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }

            '3xl': '1888px',
            // => @media (min-width: 1888px) { ... }

            '4xl': '2402px',
            // => @media (min-width: 2402px) { ... }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}
