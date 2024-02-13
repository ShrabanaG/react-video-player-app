/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1440px"
			}
		},
		extend: {
			fontFamily: {
				sans: ["circular-std"]
			},
			colors: {
				primary: {
					500: "#4A148C",
					50: "#4F2485"
				},
				black: "#202135",
				white: "#FFFFFF"
			}
		}
	},
	plugins: []
};
