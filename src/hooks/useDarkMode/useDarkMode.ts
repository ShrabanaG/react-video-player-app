import { useState } from "react";

const useDarkMode = () => {
	const [theme, setTheme] = useState<string>(localStorage.getItem("theme") as string);

	const toggle = () => {
		if (theme === "dark") {
			localStorage.setItem("theme", "light");
			document.documentElement.classList.remove("dark");
			setTheme("light");
		} else if (theme === "light") {
			localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
			setTheme("dark");
		}
	};

	return { theme, toggle };
};

export default useDarkMode;
