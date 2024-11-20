/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: {
          DEFAULT: "var(--foreground)",
          hover: "var(--foreground-hover)"
        },
        primary: {
          DEFAULT: "var(--primary)"
        },
        secondary: {
          DEFAULT: "var(--secondary)"
        },
        danger: {
          DEFAULT: "var(--danger)"
        },
        border: "var(--border)",
        input: "var(--input)"
      }
    }
  },
  darkMode: "class",
  plugins: []
};
