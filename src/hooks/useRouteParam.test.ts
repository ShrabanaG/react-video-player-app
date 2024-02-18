import { renderHook } from "@testing-library/react";
import useQuery from "./useQuery";
import useRouteParam from "./useRouteParam";

// Mock useQuery hook
jest.mock("./useQuery");

describe("useRouteParam", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("returns undefined when query is not present", () => {
		(useQuery as jest.Mock).mockReturnValueOnce(undefined);
		const { result } = renderHook(() => useRouteParam("vid"));
		expect(result.current).toBeNull();
	});

	it("returns undefined when query param is not present", () => {
		(useQuery as jest.Mock).mockReturnValueOnce(new URLSearchParams("?"));
		const { result } = renderHook(() => useRouteParam("vid"));
		expect(result.current).toBeNull();
	});

	it("returns the route parameter when query param is present", () => {
		(useQuery as jest.Mock).mockReturnValueOnce(new URLSearchParams("?vid=123"));
		const { result } = renderHook(() => useRouteParam("vid"));
		expect(result.current).toBe("123");
	});

	it("returns undefined when query param is not present for different param", () => {
		(useQuery as jest.Mock).mockReturnValueOnce(new URLSearchParams("?vid=123"));
		const { result } = renderHook(() => useRouteParam("pid"));
		expect(result.current).toBeNull();
	});

	it("returns null when query is not present for different param", () => {
		(useQuery as jest.Mock).mockReturnValueOnce(undefined);
		const { result } = renderHook(() => useRouteParam("pid"));
		expect(result.current).toBeNull();
	});

	it("returns the route parameter when query param is present for different param", () => {
		(useQuery as jest.Mock).mockReturnValueOnce(new URLSearchParams("?pid=456"));
		const { result } = renderHook(() => useRouteParam("pid"));
		expect(result.current).toBe("456");
	});
});
