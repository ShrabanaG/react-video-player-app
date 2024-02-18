import { useEffect } from "react";
import { PlayList, Sidebar, Topbar } from "../components";
import { useTabIndex } from "../hooks";
import { TAB_INDEX } from "../constants/tabIndex";
import useVideo from "../hooks/useVideo";
import ContinueWatchedVideos from "../components/continueWatchedVideos/ContinueWatchedVideos";
import AllVideos from "../components/allVideos/AllVideos";
import Playlists from "../components/playlists/Playlists";

import "./home.css";

const Home = () => {
	const { setSelectedTab } = useTabIndex();
	const { playlists, continueWatchingVideos, allVideos } = useVideo();

	useEffect(() => {
		setSelectedTab(TAB_INDEX.Home);
	}, [setSelectedTab]);

	if (allVideos.length === 0) {
		return <></>;
	}

	return (
		<div className="home p-8">
			<div className="home-width">
				<div className="text-2xl mb-6 text-black dark:text-lightWhite font-semibold tracking-wide">
					Continue Watching
				</div>
				<ContinueWatchedVideos videos={continueWatchingVideos} />
			</div>
			<div className="home-width mt-28">
				<div className="text-xl mb-6 text-black dark:text-lightWhite font-semibold tracking-wide">
					All Videos
				</div>
				<AllVideos videos={[allVideos[0], allVideos[1], allVideos[2]]} />
			</div>
			<div className="home-width mt-32">
				<div className="text-xl mb-6 text-black dark:text-lightWhite font-semibold tracking-wide">
					My Playlists
				</div>
				<Playlists playlists={playlists} />
			</div>
		</div>
	);
};

export default Home;
