import { renderHook, act } from "@testing-library/react";
import useThumbnail from "./useThumbnail";

describe("useThumbnail", () => {
	it("should remove thumbnail", () => {
		const { result } = renderHook(() => useThumbnail());
		result.current.removeThumbnail();

		expect(result.current.thumbnail).toBeNull();
	});
});
