import { FC } from "react";
import { Playlists } from "../../../@types/videos.types";
import PlaylistCard from "../../playlistCard/PlaylistCard";

const Playlist: FC<Playlists> = (playlist: Playlists): JSX.Element => {
	return (
		<div className="playlist">
			<PlaylistCard {...playlist} />
		</div>
	);
};

export default Playlist;
