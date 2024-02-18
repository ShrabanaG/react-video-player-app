import { useState, useCallback, useEffect } from "react";
import useRouteParam from "./useRouteParam";
import { Playlists, Video } from "../@types/videos.types";
import useVideo from "./useVideo";

const usePlayVideo = () => {
	const { playlists, allVideos } = useVideo();
	const [video, setVideo] = useState<Video | null>(null);
	const [playlist, setPlaylist] = useState<Playlists | null>(null);
	const pid = useRouteParam("pid");
	const vid = useRouteParam("vid");

	const getPlaylist = useCallback(() => {
		if (pid) {
			let playlist = null;
			for (let idx = 0; idx < playlists.length; idx++) {
				if (playlists[idx].playlist_id === Number(pid)) {
					playlist = playlists[idx];
					break;
				}
			}
			setPlaylist(Object.assign({}, playlist));
		}
	}, [pid, playlists]);

	const getVideo = useCallback(() => {
		if (vid) {
			let video = null;
			for (let idx = 0; idx < allVideos.length; idx++) {
				if (allVideos[idx].id === Number(vid)) {
					video = allVideos[idx];
					break;
				}
			}
			console.log("vid", video);
			setVideo(Object.assign({}, video));
		}
	}, [allVideos, vid]);

	useEffect(() => {
		getPlaylist();
		getVideo();
	}, [getPlaylist, getVideo]);

	return { getPlaylist, getVideo, video, playlist };
};

export default usePlayVideo;
