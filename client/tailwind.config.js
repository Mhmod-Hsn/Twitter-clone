const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    darkMode: false, // or 'media' or 'class'

    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: ["./src/**/*.html", "./src/**/*.vue"],

    theme: {
        fontFamily: {
            sans: ["Inter", ...defaultTheme.fontFamily.sans],
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            borderColor: ['focus-visible', 'first'],
            textColor: ['visited'],
        }
    },
    plugins: [],
};
