export default {
    content: [
        "./index.html",
        "./src/**/*.{js.jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                om: ["OwnglyphMinini", "sans-serif"],
            },
            colors: {
                brand: {
                    DEFAULT: "#01BF99",
                    light: "#E2F4E2",
                },
            },
            borderRadius: {
                "3xl": "1.75rem",
            },
            boxShadow: {
                "app-frame": "0 20px 40px rgba(15, 23, 42, 0.15)",
            },
        },
    },
    plugins: [],
}