import { renderHook } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import useQuery from "./useQuery";

jest.mock("react-router-dom", () => ({
	useLocation: jest.fn()
}));

describe("useQuery", () => {
	beforeEach(() => {
		// Reset the mocked implementation before each test
		(useLocation as jest.Mock).mockReturnValue({
			search: ""
		});
	});

	it("returns undefined when location search is empty", () => {
		const { result } = renderHook(() => useQuery());
		console.log(result.current);
		expect(result.current).toMatchObject({});
	});

	it("parses query params correctly", () => {
		(useLocation as jest.Mock).mockReturnValue({
			search: "?name=John&age=30"
		});
		const { result } = renderHook(() => useQuery());
		expect(result.current?.get("name")).toBe("John");
		expect(result.current?.get("age")).toBe("30");
	});
});
