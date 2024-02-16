import { useState } from "react";
import Logo from "../../assets/logo.svg";
import { SidebarChannelProps, SidebarMenuLinksProps } from "../../types";
import { sidebarChannelLinks, sidebarMenuLinks } from "../../constants";

import "./sidebar.css";

const Sidebar = () => {
	const [theme, setTheme] = useState("light");

	// document.documentElement.classList.add("dark");
	//document.documentElement.classList.remove("dark");

	return (
		<nav className="sidebar">
			<div className="logo-container">
				<img src={Logo} width={80} height={30} alt="video-logo" />
			</div>
			<div className="sidebar-links">
				<div className="mt-12" />
				<div className="sidebar-header">Menu</div>
				{sidebarMenuLinks.map((link: SidebarMenuLinksProps) => {
					return (
						<div className="flex py-2" key={link.label}>
							<span className="flex-center">{<link.icon />}</span>
							<span className="text-[12px] font-medium ml-3 ">{link.label}</span>
						</div>
					);
				})}
			</div>
			<div className="sidebar-channels">
				<div className="mt-6" />
				<div className="sidebar-header">Channels</div>
				{sidebarChannelLinks.map((eachLink: SidebarChannelProps) => {
					return (
						<div className="flex py-[3px]" key={eachLink.label}>
							<span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-40 text-[6px]">
								{eachLink.avatarInitials}
							</span>
							<span className="text-[11px] font-medium ml-3 flex-center">
								{eachLink.label}
							</span>
						</div>
					);
				})}
			</div>
			<div className="sidebar-premium-container">
				<div className="text-xs font-semibold">
					Get 3 months of <br /> Premium for free
				</div>
				<button className="rounded-full px-2 py-1 text-center uppercase text-[8px] font-bold border border-primary-500 text-primary-50">
					Get Premium
				</button>
			</div>
		</nav>
	);
};

export default Sidebar;
