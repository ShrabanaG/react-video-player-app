import { renderHook } from "@testing-library/react";
import { UIContext } from "../contexts";
import useTabIndex from "./useTabIndex";
import { useContext } from "react";

// Mock useContext hook
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useContext: jest.fn()
}));

describe("useTabIndex", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns the current index and setSelectedTab function", () => {
		const setIndex = jest.fn();
		(useContext as jest.Mock).mockReturnValueOnce({ index: 0, setIndex });

		const { result } = renderHook(() => useTabIndex());

		expect(result.current.index).toBe(0);
		expect(typeof result.current.setSelectedTab).toBe("function");

		// Test setSelectedTab function
		result.current.setSelectedTab(1);
		expect(setIndex).toHaveBeenCalledWith(1);
	});
});
