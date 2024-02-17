/* eslint-disable prettier/prettier */
import { useState } from "react";
import Logo from "../../assets/logo.svg";
import { SidebarChannelProps, SidebarMenuLinksProps } from "../../types";
import { sidebarChannelLinks, sidebarMenuLinks } from "../../constants";
import { Outlet } from "react-router-dom";
import "./sidebar.css";
import Topbar from "../topbar/Topbar";
import { useTabIndex } from "../../hooks";

const Sidebar = () => {
	const [theme, setTheme] = useState("light");
	const { index } = useTabIndex();
	document.documentElement.classList.add("dark");
	document.documentElement.classList.remove("dark");

	return (
		<div className="flex">
			<nav className="sidebar">
				<div className="logo-container">
					<img src={Logo} alt="video-logo" />
				</div>
				<div className="sidebar-links mt-14">
					<div className="sidebar-header">Menu</div>
					<ul>
						{sidebarMenuLinks.map((link: SidebarMenuLinksProps, idx: number) => (
							<li className={"flex py-2 " + (idx === index ? "selected" : "") } key={link.label}>
								<span className={"text-[20px] flex-center "+ (idx === index ? "selected-color" : "")} >{<link.icon />}</span>
								<span className="sidebar-links-label">{link.label}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="sidebar-channels mt-14">
					<div className="sidebar-header">Channels</div>
					<ul>
						{sidebarChannelLinks.map((eachLink: SidebarChannelProps) => {
							return (
								<li className="flex py-2" key={eachLink.label}>
									<span>
										<img
											src={eachLink.imgSrc}
											alt="avatar-img"
											className="sidebar-channels-avatar"
										/>
									</span>
									<span className="sidebar-links-label flex-center">{eachLink.label}</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="sidebar-premium-container">
					<div className="text-[16px] font-semibold dark:text-white">
						Get 3 months of <br /> Premium for free
					</div>
					<button className="text-[14px] mt-6 sidebar-premium-btn">Get Premium</button>
				</div>
			</nav>
			<div className="block flex-grow">
				<div className="flex flex-col w-full">
					<Topbar />
				</div>
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Sidebar;
