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
				circular: ["circular-std", "sans-serif"]
			},
			colors: {
				primary: {
					500: "#4A148C",
					50: "#4F2485",
					40: "#E2DAEB",
					30: "#E5DEED"
				},

				black: "#202135",
				white: "#FFFFFF",
				red: "#FF0000"
			}
		}
	},
	plugins: []
};
