/* eslint-disable react/prop-types */
import { FC } from "react";
import { Playlists as PlaylistsType } from "../../@types/videos.types";
import Playlist from "./playlist/Playlist";

const Playlists: FC<{ playlists: PlaylistsType[] }> = ({ playlists }: { playlists: PlaylistsType[] }): JSX.Element => {
	return (
		<div className="playlist flex  items-center  justify-start flex-wrap gap-4">
			{playlists.map((playlist: PlaylistsType, index: number) => {
				return <Playlist {...playlist} key={index} />;
			})}
		</div>
	);
};

export default Playlists;
