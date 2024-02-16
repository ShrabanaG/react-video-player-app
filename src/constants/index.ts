import { IoHomeOutline } from "react-icons/io5";
import { RiPlayList2Line } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";

export const sidebarMenuLinks = [
	{
		icon: IoHomeOutline,
		label: "Home"
	},
	{
		icon: RiPlayList2Line,
		label: "Playlists"
	},
	{
		icon: MdFavoriteBorder,
		label: "Favorites"
	}
];

export const sidebarChannelLinks = [
	{
		avatarInitials: "SG",
		label: "Shrabana Goswami"
	},
	{
		avatarInitials: "SJ",
		label: "Sanaah Jain"
	},
	{
		avatarInitials: "AR",
		label: "Aakash Rigi Club"
	},
	{
		avatarInitials: "IC",
		label: "Ishan C Rigi Club"
	}
];

export const sidebarLinks = [
	{
		header: "Menu",
		items: [
			{
				icon: IoHomeOutline,
				label: "Home"
			},
			{
				icon: RiPlayList2Line,
				label: "Playlists"
			},
			{
				icon: MdFavoriteBorder,
				label: "Favorites"
			}
		]
	},
	{
		header: "Subscriptions",
		items: [
			{
				avatarInitials: "SG",
				label: "Shrabana Goswami"
			},
			{
				avatarInitials: "SJ",
				label: "Sanaah Jain"
			},
			{
				avatarInitials: "AR",
				label: "Aakash Rigi Club"
			},
			{
				avatarInitials: "IC",
				label: "Ishan C Rigi Club"
			}
		]
	}
];
