import { FC, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import usePlayVideo from "../../hooks/usePlayVideo";
import { Playlists, Video } from "../../@types/videos.types";
import VideoCard from "../../components/videoCards/VideoCards";

const PlayVideo: FC = (): JSX.Element => {
	const { video, playlist } = usePlayVideo();
	const [tempPlaylist, setTempPlaylist] = useState<Playlists | null>(null);

	useEffect(() => {
		if (playlist) {
			setTempPlaylist(playlist); // No need for Object.assign, useState already creates a new object
		}
	}, [playlist]);

	const handleDragEnd = (result: any) => {
		if (!result.destination) return;
		if (tempPlaylist && tempPlaylist.videos) {
			const items = Array.from(tempPlaylist.videos);
			const [reorderedItem] = items.splice(result.source.index, 1);
			items.splice(result.destination.index, 0, reorderedItem);
			setTempPlaylist({ ...tempPlaylist, videos: items });
		}
	};

	if (video === null) {
		return <></>;
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="play-video p-8">
				<div className="flex justify-center items-start gap-28">
					<div>
						<VideoPlayer src={video.video} />
					</div>
					{playlist ? (
						<div className="flex flex-col gap-4 border border-lightGrey rounded-[10px] dark:bg-lightBlack bg-lightWhite p-4">
							<div className="playlist-header text-xl font-bold tracking-wider dark:text-lightWhite">
								{playlist.playlist_name}
							</div>
							<Droppable droppableId="playlist-droppable">
								{(provided: any) => (
									<div
										className="flex flex-col gap-8 h-[550px] overflow-scroll"
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										{tempPlaylist?.videos.map((_video: Video, index: number) => (
											<Draggable key={_video.id} draggableId={_video.id.toString()} index={index}>
												{(provided: any) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<div
															className={
																"flex gap-4 py-2 " +
																(video.id === _video.id ? "bg-lightGrey w-[100%]" : "")
															}
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
										))}
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
