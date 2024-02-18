import { FC, useState, useEffect, useRef, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import usePlayVideo from "../../hooks/usePlayVideo";
import { Playlists, Video } from "../../@types/videos.types";
import VideoCard from "../../components/videoCards/VideoCards";
import { useNavigate } from "react-router-dom";
import useRouteParam from "../../hooks/useRouteParam";

const PlayVideo: FC = (): JSX.Element => {
	const navigate = useNavigate();
	const playlistId = useRouteParam("pid");
	const videoId = useRouteParam("vid");
	const { video, playlist } = usePlayVideo();
	const initialPlaylist = useRef<Playlists | null>(null);
	const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
	const [tempPlaylist, setTempPlaylist] = useState<Playlists | null>(null);
	const [filteredPlaylist, setFilteredPlaylist] = useState<Playlists | null>(null);
	const handlePlaylistSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void | null => {
		if (!playlist || !tempPlaylist) {
			return null;
		}
		const { value } = event.target;
		if (value === "") {
			setTempPlaylist(Object.assign({}, initialPlaylist.current));
		}
		const videos = playlist.videos.filter((video: Video) => video.title.includes(value));
		const _tempPlaylist = Object.assign({}, tempPlaylist);
		_tempPlaylist.videos = Object.assign([], [...videos]);
		setTempPlaylist(Object.assign({}, _tempPlaylist));
	};

	useEffect(() => {
		if (playlist) {
			setTempPlaylist(playlist); // No need for Object.assign, useState already creates a new object
			initialPlaylist.current = playlist;
		}
		if (video) {
			setCurrentVideo(Object.assign({}, video));
		}
	}, [playlist, video]);

	const handleDragEnd = (result: any) => {
		if (!result.destination) return;
		if (tempPlaylist && tempPlaylist.videos) {
			const items = Array.from(tempPlaylist.videos);
			const [reorderedItem] = items.splice(result.source.index, 1);
			items.splice(result.destination.index, 0, reorderedItem);
			setTempPlaylist({ ...tempPlaylist, videos: items });
		}
	};

	const handlePlaylistClick = useCallback(
		(video: Video) => {
			//setCurrentVideo(Object.assign({}, video));
			let route = `/video?vid=${video.id}`;
			if (playlistId) {
				route = route + `&pid=${playlistId}`;
			}
			navigate(route);
			window.location.reload();
		},
		[navigate, playlistId]
	);

	if (video === null || currentVideo === null) {
		return <></>;
	}

	console.log("tempPlaylist", tempPlaylist);
	console.log("playlist", playlist);
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="play-video p-8">
				<div className="flex justify-center items-start gap-16">
					<div>
						<VideoPlayer src={currentVideo.video} video_id={currentVideo.id} />
						<div className="video-desc mt-[70px]">
							<div className="title text-2xl text-black dark:text-lightWhite font-bold">
								{currentVideo.title}
							</div>
							<div className="flex gap-4">
								<div className="flex gap-2 mt-2 items-center justify-start">
									<img
										src={currentVideo.avatar}
										alt="avatar-img"
										className="channels-avatar justify-center items-center"
									/>
									<div className="text-black dark:text-greyBlack text-base">{video.name}</div>
								</div>
							</div>
						</div>
					</div>
					{playlist ? (
						<div className="flex flex-col gap-4 border border-lightGrey rounded-[10px] dark:bg-lightBlack bg-lightWhite p-4">
							<div className="flex items-center justify-between">
								<div className="playlist-header text-xl font-bold tracking-wider dark:text-lightWhite">
									{playlist.playlist_name}
								</div>
								<form className="flex items-center max-w-sm mx-auto ml-0 mr-0">
									<label htmlFor="simple-search" className="sr-only">
										Search
									</label>
									<div className="relative w-[150px]">
										<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
											<svg
												className="w-4 h-4"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 20 20"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
												/>
											</svg>
										</div>
										<input
											type="text"
											id="simple-search"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Search..."
											required
											onChange={handlePlaylistSearchChange}
										/>
									</div>
								</form>
							</div>
							<Droppable droppableId="playlist-droppable">
								{(provided: any) => (
									<div
										className="flex flex-col gap-8 h-[550px] overflow-scroll"
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										{tempPlaylist && tempPlaylist.videos.length !== 0 ? (
											tempPlaylist.videos.map((_video: Video, index: number) => (
												<Draggable
													key={_video.id}
													draggableId={_video.id.toString()}
													index={index}
												>
													{(provided: any) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<div
																className={
																	"flex gap-4 py-2 " +
																	(currentVideo.id === _video.id
																		? "bg-lightGrey w-[100%]"
																		: "")
																}
																onClick={() => handlePlaylistClick(_video)}
															>
																<VideoCard
																	video={_video}
																	key={index}
																	size="extra-small"
																	removeLabel
																/>
																<div className="flex flex-col">
																	<div className="text-sm w-[200px] dark:text-white font-semibold">
																		{_video.title}
																	</div>
																	<div className="flex gap-2 mt-2 items-center justify-start">
																		<img
																			src={_video.avatar}
																			alt="avatar-img"
																			className="channels-avatar justify-center items-center"
																		/>
																		<div className="text-black dark:text-greyBlack text-sm">
																			{_video.name}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													)}
												</Draggable>
											))
										) : (
											<div className="text-xl dark:text-white text-black text-center w-[300px]">
												No videos to show
											</div>
										)}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					) : null}
				</div>
			</div>
		</DragDropContext>
	);
};

export default PlayVideo;
