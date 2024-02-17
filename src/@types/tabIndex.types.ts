export type Tab = "Home" | "Playlist" | "Favourites";

export type TabIndex = {
	[key in Tab]: number;
};
