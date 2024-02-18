import { IoHomeOutline, IoHome } from "react-icons/io5";
import { RiPlayList2Line, RiPlayListFill } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

import Avatar1 from "../assets/avatar1.png";
import Avatar2 from "../assets/avatar2.png";
import Avatar3 from "../assets/avatar3.png";
import Avatar4 from "../assets/avatar4.png";

export const sidebarMenuLinks = [
	{
		outlinedIcon: IoHomeOutline,
		icon: IoHome,
		label: "Home"
	},
	{
		outlinedIcon: RiPlayList2Line,
		icon: RiPlayListFill,
		label: "Playlists"
	},
	{
		outlinedIcon: MdFavoriteBorder,
		icon: MdFavorite,
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
