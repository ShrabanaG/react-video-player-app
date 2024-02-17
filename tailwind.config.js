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
					dark: {
						100: "#262428",
						70: "#262428"
					},
					500: "#4A148C",
					50: "#4F2485",
					40: "#E2DAEB",
					30: "#E5DEED"
				},
				lightBlack: "#262428",
				black: "#202135",
				white: "#FFFFFF",
				red: "#FF0000",
				darkBlack: "#1C1A1D",
				green: "#00c853",
				darkSelectedTab: "#2D2E33"
			}
		}
	},
	plugins: []
};
