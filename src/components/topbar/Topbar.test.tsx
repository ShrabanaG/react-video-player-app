import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDarkMode } from "../../hooks";
import Topbar from "./Topbar";

jest.mock("../../hooks/useDarkMode");

describe("Topbar Component Renders Correctly", () => {
	test("renders upload button, user avatar, and theme toggle", () => {
		(useDarkMode as jest.Mock).mockReturnValue({
			theme: "light", // Set initial theme mode for the test
			toggle: jest.fn() // Mock the toggle function
		});
		render(<Topbar />);

		// Check if upload button is rendered
		const uploadButton = screen.getByText("Upload Video");
		expect(uploadButton).toBeInTheDocument();

		// Check if user avatar is rendered
		const avatar = screen.getByAltText("my-logo");
		expect(avatar).toBeInTheDocument();

		// Check if user name is rendered
		const userName = screen.getByText("Hii Rigi");
		expect(userName).toBeInTheDocument();

		// Check if theme toggle is rendered
		const themeToggle = screen.getByTestId("theme-toggle");
		expect(themeToggle).toBeInTheDocument();

		// Check if theme is initially in light mode
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	test("theme toggle switches between light and dark modes", () => {
		// Mock the return value of useDarkMode hook
		const toggleMock = jest.fn();
		(useDarkMode as jest.Mock).mockReturnValue({
			theme: "light",
			toggle: toggleMock
		});

		render(<Topbar />);

		// Click on theme toggle
		const themeToggleIcon = screen.getByTestId("theme-toggle");
		userEvent.click(themeToggleIcon);

		// Check if toggle function is called
		expect(toggleMock).toHaveBeenCalled();
	});
});
