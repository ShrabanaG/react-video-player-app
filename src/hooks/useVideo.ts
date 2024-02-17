import { useCallback, useEffect, useState } from "react";
import { PLAYLISTS } from "../constants/playlists";
import { ALL_VIDEOS } from "../constants/allVideos";

const useVideo = () => {
	const [playlists, setPlaylists] = useState([]);
	const [continueWatchingVideos, setContinueWatchingVideos] = useState([]);
	const [allVideos, setAllVideos] = useState([]);

	const getPlaylists = useCallback(() => {
		const _playlists = PLAYLISTS.map((playlist: (typeof PLAYLISTS)[number]) => {
			const { videoIds } = playlist;
			const video = null;
			const videos: any[] = [];
			videoIds.forEach((videoId: number) => {
				for (let idx = 0; idx < ALL_VIDEOS.length; idx++) {
					if (ALL_VIDEOS[idx].id === videoId) {
						//video = ALL_VIDEOS[idx];
						videos.push(ALL_VIDEOS[idx]);
						break;
					}
				}
			});
			return { ...playlist, videos };
		});
		setPlaylists(Object.assign([], _playlists));
	}, []);

	const getContinueWatchingVideos = useCallback(() => {
		const _continueWatchingVideos: any[] = [];
		ALL_VIDEOS.forEach((video: (typeof ALL_VIDEOS)[number]) => {
			if (video.watched_time !== null) {
				_continueWatchingVideos.push(video);
			}
		});
		setContinueWatchingVideos(Object.assign([], _continueWatchingVideos));
	}, []);

	const getAllVideos = useCallback(() => {
		setAllVideos(Object.assign([], ALL_VIDEOS));
	}, []);

	useEffect(() => {
		getAllVideos();
		getContinueWatchingVideos();
		getPlaylists();
	}, [getAllVideos, getContinueWatchingVideos, getPlaylists]);

	return { playlists, allVideos, continueWatchingVideos };
};

export default useVideo;
