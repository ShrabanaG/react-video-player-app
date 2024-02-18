import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { sidebarChannelLinks, sidebarMenuLinks } from "../../constants";
import { SidebarChannelProps, SidebarMenuLinksProps } from "../../types";

describe("Sidebar Component Renders Correctly", () => {
	test("Renders Logo and menu links", () => {
		render(<Sidebar />);

		// Check if logo is rendered
		const logo = screen.getByAltText("video-logo");
		expect(logo).toBeInTheDocument();

		//check if menu links are rendered
		const menuLinksElement = screen.getAllByTestId("menu-links");
		expect(menuLinksElement).toHaveLength(sidebarMenuLinks.length);

		sidebarMenuLinks.forEach((link: SidebarMenuLinksProps) => {
			const linkLabelText = screen.getByText(link.label);
			expect(linkLabelText).toBeInTheDocument();
		});
	});

	test("renders channels and premium section", () => {
		render(<Sidebar />);

		// Check if channel links are rendered
		const channelLinks = screen.getAllByTestId("channel-links");
		expect(channelLinks).toHaveLength(sidebarChannelLinks.length);
		sidebarChannelLinks.forEach((channel: SidebarChannelProps) => {
			expect(screen.getByText(channel.label)).toBeInTheDocument();
			expect(screen.getByAltText(`${channel.label}-avatar`)).toBeInTheDocument();
		});

		// Check if premium section is rendered
		expect(screen.getByText("Get 3 months of Premium for free")).toBeInTheDocument();
		expect(screen.getByText("Get Premium")).toBeInTheDocument();
	});
});
