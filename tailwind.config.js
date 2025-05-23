/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html", // Hvis du har denne i roten
      "./src/**/*.{vue,js,ts,jsx,tsx}", // Dekker filer i src
      // Legg til flere stier her hvis du har .vue/.js-filer andre steder
    ],
    theme: {
      extend: {}, // Her kan du legge til egne farger, fonter etc. senere
    },
    plugins: [], // For Tailwind-plugins
  }