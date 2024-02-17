import { useEffect } from "react";
import { PlayList, Sidebar, Topbar } from "../components";
import { useTabIndex } from "../hooks";
import { TAB_INDEX } from "../constants/tabIndex";
import useVideo from "../hooks/useVideo";

const Home = () => {
	const { setSelectedTab } = useTabIndex();
	const { playlists, continueWatchingVideos, allVideos } = useVideo();

	useEffect(() => {
		setSelectedTab(TAB_INDEX.Home);
	}, [setSelectedTab]);

	return <div className="home">home</div>;
};

export default Home;
