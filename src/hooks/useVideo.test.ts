import { renderHook } from "@testing-library/react";
import useVideo from "./useVideo";
import { PLAYLISTS } from "../constants/playlists";
import { ALL_VIDEOS } from "../constants/allVideos";
import { Video } from "../@types/videos.types";

describe("useVideo", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should fetch playlists correctly", () => {
		const { result } = renderHook(() => useVideo());

		expect(result.current.playlists.length).toEqual(PLAYLISTS.length);
	});

	it("should fetch continue watching videos correctly", () => {
		const { result } = renderHook(() => useVideo());

		const continueWatchingVideos = ALL_VIDEOS.filter((video: Video) => video.watched_time !== null);
		expect(result.current.continueWatchingVideos).toEqual(expect.arrayContaining(continueWatchingVideos));
	});

	it("should fetch all videos correctly", () => {
		const { result } = renderHook(() => useVideo());

		expect(result.current.allVideos).toEqual(expect.arrayContaining(ALL_VIDEOS));
	});
});
