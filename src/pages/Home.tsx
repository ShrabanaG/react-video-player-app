import { PlayList, Sidebar, Topbar } from "../components";

const Home = () => {
	return (
		// <div className="w-full md:flex">
		// 	<Sidebar />
		// 	<Topbar />
		// 	<PlayList />
		// </div>
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex flex-col w-full ">
				<Topbar />
				<main className="flex-1">
					<PlayList />
				</main>
			</div>
		</div>
	);
};

export default Home;
