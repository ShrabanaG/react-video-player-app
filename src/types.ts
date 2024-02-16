export type SidebarLinks = {
	icon?: React.ElementType;
	avatarInitials?: string;
	label: string;
};

export type SidebarLink = {
	header: string;
	items: SidebarLinks[];
};

export type SidebarLinksProps = {
	links: SidebarLink[];
};

export type SidebarMenuLinksProps = {
	icon: React.ElementType;
	label: string;
};

export type SidebarChannelProps = {
	avatarInitials: string;
	label: string;
};
