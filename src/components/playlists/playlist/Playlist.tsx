import { FC, useCallback } from "react";
import { Playlists } from "../../../@types/videos.types";
import PlaylistCard from "../../playlistCard/PlaylistCard";
import { useNavigate } from "react-router-dom";

const Playlist: FC<Playlists> = (playlist: Playlists): JSX.Element => {
	const navigate = useNavigate();

	const handleVideoClick = useCallback(() => {
		navigate(`/video?vid=${playlist.videos[0].id}&pid=${playlist.playlist_id}`);
	}, [navigate, playlist.playlist_id, playlist.videos]);

	return (
		<div className="playlist cursor-pointer" onClick={handleVideoClick}>
			<PlaylistCard {...playlist} />
		</div>
	);
};

export default Playlist;
