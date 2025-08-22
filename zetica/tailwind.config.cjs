/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // body default
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        // untuk heading
        heading: ["var(--font-heading)", "monospace"],
      },
    },
  },
  plugins: [],
};
