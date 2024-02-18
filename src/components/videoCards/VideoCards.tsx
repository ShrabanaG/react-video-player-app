import { FC, useRef, useEffect, useCallback, useState } from "react";
import { useThumbnail } from "../../hooks";
import { Video } from "../../@types/videos.types";

const VideoCard: FC<{ video: Video; size: "large" | "small" | "extra-small"; removeLabel?: boolean }> = ({
	video,
	size,
	removeLabel
}: {
	video: Video;
	size: "large" | "small" | "extra-small";
	removeLabel?: boolean;
}): JSX.Element => {
	const { captureThumbnail, thumbnail, removeThumbnail } = useThumbnail();
	const videoPlayerRef = useRef<HTMLVideoElement>(null);
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);

	const handleMouseEnter = useCallback(() => {
		//alert("hio");

		if (videoPlayerRef.current) {
			removeThumbnail();
			setIsVideoPlaying(true);
			videoPlayerRef.current.currentTime = video.watched_time ? video.watched_time : 0;
			videoPlayerRef.current.play();
		}
	}, [removeThumbnail, video?.watched_time]);

	const handleMouseLeave = useCallback(() => {
		setIsVideoPlaying(false);
		setTimeout(() => {
			if (videoPlayerRef.current) {
				videoPlayerRef.current?.pause();
			}
			captureThumbnail(videoPlayerRef);
		}, 500);
	}, [captureThumbnail]);

	useEffect(() => {
		if (videoPlayerRef.current) {
			captureThumbnail(videoPlayerRef);
		}
		return () => {
			captureThumbnail(videoPlayerRef);
		};
	}, [captureThumbnail]);

	return (
		<div
			className={
				"video-cards relative rounded-[20px]" +
				(size === "large"
					? " w-[400px] h-[250px]"
					: size === "small"
					? " w-[300px] h-[200px]"
					: " w-[130px] h-[80px]")
			}
		>
			<video
				ref={videoPlayerRef}
				src={video.video}
				controls={false}
				muted
				className="rounded-[5px]"
				onLoadedData={() => captureThumbnail(videoPlayerRef)}
				style={{ width: "100%", height: "100%", objectFit: "cover" }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
			{removeLabel === true ? null : (
				<div className="mt-2 text-lg">
					<div className="text-black dark:text-lightWhite font-medium">{video.title}</div>
					<div className="flex gap-2 mt-2">
						<div>
							<img
								src={video.avatar}
								alt="avatar-img"
								className="channels-avatar justify-center items-center"
							/>
						</div>
						<div className="text-black dark:text-greyBlack justify-center items-center text-base">
							{video.name}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default VideoCard;
