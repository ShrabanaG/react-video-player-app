import { IoHomeOutline } from "react-icons/io5";
import { RiPlayList2Line } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";

import Avatar1 from "../assets/avatar1.png";
import Avatar2 from "../assets/avatar2.png";
import Avatar3 from "../assets/avatar3.png";
import Avatar4 from "../assets/avatar4.png";

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
		imgSrc: Avatar4,
		label: "Sanaah Jain"
	},
	{
		imgSrc: Avatar2,
		label: "Aakash Rigi Club"
	},
	{
		imgSrc: Avatar3,
		label: "Ishan C Rigi Club"
	},
	{
		imgSrc: Avatar1,
		label: "Shrabana Goswami"
	}
];
