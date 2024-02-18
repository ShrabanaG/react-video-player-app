import { FC } from "react";
import { PlaylistData, Playlists } from "../../@types/videos.types";
import VideoCard from "../videoCards/VideoCards";

const PlaylistCard: FC<Playlists> = (playlist: Playlists): JSX.Element => {
	return (
		<div className="playlist-card relative cursor-pointer">
			<VideoCard video={playlist.videos[0]} size="small" />
			<div className="absolute z-10 text-lightWhite right-0 top-0 h-[100%] w-[120px] bg-black opacity-90" />
			<div className="absolute z-10 text-lightWhite right-[30px] top-[80px] text-xl text-center font-semibold">
				<div>{playlist.videos.length}</div>
				<div>Videos</div>
			</div>
		</div>
	);
};

export default PlaylistCard;
