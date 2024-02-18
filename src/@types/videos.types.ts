export type Video = {
	video: any;
	title: string;
	description: string;
	id: number;
	favorite: boolean;
	watched_time: number | null;
	avatar: any;
	name: string;
};

export type PlaylistData = {
	playlist_id: number;
	playlist_name: string;
	videoIds: number[];
};

export type Playlists = {
	playlist_id: number;
	playlist_name: string;
	videos: Video[];
};
