import { useEffect } from "react";
import { PlayList, Sidebar, Topbar } from "../components";
import { useTabIndex } from "../hooks";
import { TAB_INDEX } from "../constants/tabIndex";
import useVideo from "../hooks/useVideo";
import ContinueWatchedVideos from "../components/continueWatchedVideos/ContinueWatchedVideos";
import AllVideos from "../components/allVideos/AllVideos";
import Playlists from "../components/playlists/Playlists";

const Home = () => {
	const { setSelectedTab } = useTabIndex();
	const { playlists, continueWatchingVideos, allVideos } = useVideo();

	useEffect(() => {
		setSelectedTab(TAB_INDEX.Home);
	}, [setSelectedTab]);

	return (
		<div className="home p-8">
			<div>
				<div className="text-2xl mb-6 text-black dark:text-lightWhite font-semibold tracking-wide">
					Continue Watching
				</div>
				<ContinueWatchedVideos videos={continueWatchingVideos} />
			</div>
			<div className="mt-28">
				<div className="text-xl mb-6 text-black dark:text-lightWhite font-semibold tracking-wide">
					All Videos
				</div>
				<AllVideos videos={allVideos} />
			</div>
			<div className="mt-32">
				<div className="text-xl mb-6 text-black dark:text-lightWhite font-semibold tracking-wide">
					My Playlists
				</div>
				<Playlists playlists={playlists} />
			</div>
		</div>
	);
};

export default Home;
