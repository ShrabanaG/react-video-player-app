/* eslint-disable prettier/prettier */
import { useState } from "react";
import Logo from "../../assets/logo.svg";
import { SidebarChannelProps, SidebarMenuLinksProps } from "../../types";
import { sidebarChannelLinks, sidebarMenuLinks } from "../../constants";
import { Outlet } from "react-router-dom";
import "./sidebar.css";
import Topbar from "../topbar/Topbar";
import { useTabIndex } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const { index } = useTabIndex();
	const navigate = useNavigate();
	return (
		<div className="flex">
			<nav className="sidebar">
				<div className="logo-container">
					<img src={Logo} alt="video-logo" />
				</div>
				<div className="sidebar-links mt-14 cursor-pointer">
					<div className="sidebar-header">Menu</div>
					<ul>
						{sidebarMenuLinks.map((link: SidebarMenuLinksProps, idx: number) => (
							<li
								className={"flex py-2 " + (idx === index ? "selected" : "")}
								key={link.label}
								data-testid="menu-links"
								onClick={() => { link.label === "Home" ? navigate("/") : null }}
							>
								{idx === index ? (
									<span className={"text-[20px] flex-center selected-link-icon"}>
										{<link.icon />}
									</span>
								) : (
									<span className="text-[20px] flex-center ">{<link.outlinedIcon />}</span>
								)}
								<span className="sidebar-links-label">{link.label}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="sidebar-channels mt-14 cursor-pointer">
					<div className="sidebar-header">Channels</div>
					<ul>
						{sidebarChannelLinks.map((eachLink: SidebarChannelProps) => {
							return (
								<li className="flex py-2" key={eachLink.label} data-testid="channel-links">
									<span>
										<img
											src={eachLink.imgSrc}
											alt={`${eachLink.label}-avatar`}
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
					<button className="text-[14px] mt-6 sidebar-premium-btn" onClick={() => window.open("https://play.google.com/store/apps/details?id=com.rigiapp&hl=en_IN&gl=US&pli=1", "_blank")}>Get Premium</button>
				</div>
			</nav>
			<div className="block flex-grow">
				<div className="flex flex-col w-full">
					<Topbar />
				</div>
				<main className="md:ml-[250px] ml-0">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Sidebar;
