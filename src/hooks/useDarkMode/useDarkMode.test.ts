import { renderHook, act } from "@testing-library/react";
import useDarkMode from "./useDarkMode";

describe("useDarkMode hook test", () => {
	beforeEach(() => {
		localStorage.setItem("theme", "dark");
	});

	test("Initializes with dark theme", () => {
		const { result } = renderHook(useDarkMode);

		expect(result.current.theme).toBe("dark");
	});

	test("toggles theme from dark to light", () => {
		localStorage.setItem("theme", "dark");
		document.documentElement.classList.add("dark");

		const { result } = renderHook(() => useDarkMode());

		act(() => {
			result.current.toggle();
		});

		expect(result.current.theme).toBe("light");
		expect(localStorage.getItem("theme")).toBe("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	test("toggles theme from light to dark mode", () => {
		localStorage.setItem("theme", "light");

		const { result } = renderHook(() => useDarkMode());

		act(() => {
			result.current.toggle();
		});

		expect(result.current.theme).toBe("dark");
		expect(localStorage.getItem("theme")).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});
});
