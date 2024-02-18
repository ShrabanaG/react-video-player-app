import { FC, useCallback, useEffect, useRef, useState } from "react";
import { VideoPlayerProps } from "../../@types/propTypes/videoPlayerProps.types";
import { useThumbnail } from "../../hooks";
import { IoMdPlay } from "react-icons/io";
import { IoMdPause } from "react-icons/io";
import { MdVolumeDown } from "react-icons/md";
import { MdVolumeUp } from "react-icons/md";
import { MdVolumeOff } from "react-icons/md";
import { MdFullscreen } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { MdLoop } from "react-icons/md";
import { CgMiniPlayer } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { MdOutlineSpeed } from "react-icons/md";
import "./videoPlayer.css";

const VideoPlayer: FC<VideoPlayerProps> = ({ src, video_id }: VideoPlayerProps): JSX.Element => {
	const navigate = useNavigate();
	const [currentSource, setCurrentSource] = useState(src);
	const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>();
	const [isFirstTimePlaying, setIsFirstTimePlaying] = useState<boolean>(true);
	const { thumbnail, captureThumbnail, removeThumbnail } = useThumbnail();
	const [volume, setVolume] = useState<number>(1);
	const [autoPlay, setAutoPlay] = useState<boolean>(false);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [totalTime, setTotalTime] = useState<number>(0);
	const [isSeeking, setIsSeeking] = useState<boolean>(false);
	const [hasPlayedBeforeSeek, setHasPlayedBeforeSeek] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
	const [isLooping, setIsLooping] = useState<boolean>(false);
	const videoPlayerRef = useRef<HTMLVideoElement>(null);
	const [showPlaybackSpeedOption, setShowPlaybackSpeedOption] = useState(false);

	const togglePlay = useCallback(() => {
		if (videoPlayerRef?.current?.paused) {
			if (isFirstTimePlaying) {
				const lastPlayedDuration = localStorage.getItem("@last_played_duration");
				console.log(
					"JSON.parse(lastPlayedDuration)[String(video_id)]",
					JSON.parse(lastPlayedDuration as string)[String(video_id)]
				);
				if (lastPlayedDuration && JSON.parse(lastPlayedDuration)[String(video_id)]) {
					videoPlayerRef.current.currentTime = JSON.parse(lastPlayedDuration)[String(video_id)];
				} else {
					videoPlayerRef.current.currentTime = 0;
				}
				setIsFirstTimePlaying(false);
			}

			videoPlayerRef.current.play();
			setIsVideoPlaying(true);
		} else {
			videoPlayerRef?.current?.pause();
			setIsVideoPlaying(false);
		}
		removeThumbnail();
	}, [isFirstTimePlaying, removeThumbnail, video_id]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (videoPlayerRef.current) {
				switch (event.key) {
					case "ArrowRight":
						event.preventDefault();
						videoPlayerRef.current.currentTime += 5; // Forward 5 seconds
						break;
					case "ArrowLeft":
						event.preventDefault();
						videoPlayerRef.current.currentTime -= 5; // Backward 5 seconds
						break;
					case "ArrowUp":
						event.preventDefault();
						setVolume((prevVolume: any) => Math.min(prevVolume + 0.1, 1)); // Increase volume by 0.1
						break;
					case "ArrowDown":
						event.preventDefault();
						setVolume((prevVolume: any) => Math.max(prevVolume - 0.1, 0)); // Decrease volume by 0.1
						break;
					case "p":
					case "P":
					case " ":
						event.preventDefault();
						togglePlay();
						break;
					default:
						break;
				}
			}
		},
		[togglePlay]
	);

	useEffect(() => {
		if (videoPlayerRef.current) {
			videoPlayerRef.current.autoplay = autoPlay;
			videoPlayerRef.current.playbackRate = playbackSpeed; // Set initial playback speed
			videoPlayerRef.current.loop = isLooping; // Enable looping

			const handleTimeUpdate = () => {
				if (videoPlayerRef.current) {
					setCurrentTime(videoPlayerRef.current.currentTime);
					setTotalTime(videoPlayerRef.current.duration);
				}
			};

			videoPlayerRef.current.addEventListener("timeupdate", handleTimeUpdate);

			return () => {
				if (videoPlayerRef.current) {
					videoPlayerRef.current.removeEventListener("timeupdate", handleTimeUpdate);
				}
			};
		}
	}, [autoPlay, playbackSpeed, isLooping]);

	const handleLoadedMetadata = useCallback(() => {
		captureThumbnail(videoPlayerRef);
		setTotalTime(videoPlayerRef.current?.duration || 0);
	}, [captureThumbnail]);

	useEffect(() => {
		if (videoPlayerRef.current) {
			captureThumbnail(videoPlayerRef);
		}
	}, [captureThumbnail]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown as unknown as EventListener);

		return () => {
			document.removeEventListener("keydown", handleKeyDown as unknown as EventListener);
		};
	}, [handleKeyDown]);

	useEffect(() => {
		if (videoPlayerRef.current) {
			videoPlayerRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
			return () => {
				videoPlayerRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
			};
		}
	}, [handleLoadedMetadata]);

	const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(event.target.value);
		setVolume(newVolume);
		if (videoPlayerRef.current) videoPlayerRef.current.volume = newVolume;
	};

	const toggleAutoPlay = () => {
		setAutoPlay((prevAutoPlay: boolean) => !prevAutoPlay);
	};

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = parseFloat(event.target.value);
		setCurrentTime(newTime);
		if (!isSeeking) {
			if (videoPlayerRef.current) videoPlayerRef.current.currentTime = newTime;
		}
	};

	const handleSliderMouseDown = () => {
		setIsSeeking(true);
		if (videoPlayerRef.current) {
			if (videoPlayerRef.current.paused) {
				setHasPlayedBeforeSeek(false);
			} else {
				setHasPlayedBeforeSeek(true);
				videoPlayerRef.current.pause();
			}
		}
	};

	const handleSliderMouseUp = () => {
		setIsSeeking(false);
		if (videoPlayerRef.current) {
			videoPlayerRef.current.currentTime = currentTime;
			if (hasPlayedBeforeSeek) {
				videoPlayerRef.current.play();
			}
		}
	};

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			if (videoPlayerRef.current) {
				videoPlayerRef.current.requestFullscreen();
			}
		} else {
			document.exitFullscreen();
		}
	};

	const handlePlaybackSpeedChange = (newSpeed: number) => {
		setPlaybackSpeed(newSpeed);
		if (videoPlayerRef.current) videoPlayerRef.current.playbackRate = newSpeed;
	};

	const togglePictureInPicture = () => {
		if (document.pictureInPictureEnabled) {
			if (!document.pictureInPictureElement) {
				videoPlayerRef.current?.requestPictureInPicture();
			} else {
				document.exitPictureInPicture();
			}
		}
	};

	const handleLoopToggle = () => {
		setIsLooping((prevLooping: any) => !prevLooping);
	};

	const handleDownload = () => {
		if (videoPlayerRef.current) {
			const a = document.createElement("a");
			a.href = videoPlayerRef.current.src;
			a.download = "video.mp4";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	useEffect(() => {
		const lastPlayedDuration = localStorage.getItem("@last_played_duration");
		if (currentTime < totalTime && isFirstTimePlaying === false) {
			localStorage.setItem(
				"@last_played_duration",
				JSON.stringify({
					...(lastPlayedDuration ? JSON.parse(lastPlayedDuration as string) : {}),
					[video_id]: currentTime
				})
			);
		}
	}, [currentTime, isFirstTimePlaying, totalTime, video_id]);

	return (
		<div className="video-player" style={{ width: "600px", height: "300x" }}>
			<div id="wrap" style={{ position: "relative", width: "100%", height: "350px" }}>
				<video
					ref={videoPlayerRef}
					src={currentSource}
					controls={false}
					onLoadedData={() => captureThumbnail(videoPlayerRef)}
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
					loop={isLooping}
					onClick={togglePlay}
					className="rounded-t-[10px]"
				></video>
				{thumbnail && (
					<img
						src={thumbnail}
						alt="Thumbnail"
						className="rounded-t-[10px]"
						style={{
							width: "600px",
							height: "350px",
							objectFit: "cover",
							position: "absolute",
							top: 0,
							left: 0
						}}
					/>
				)}
				<div className="bg-darkBlack rounded-b-[5px]">
					{isFirstTimePlaying ? null : (
						<div className="relative -mt-[14px]">
							<input
								type="range"
								className="appearance-none w-full h-1 bg-gray-400 rounded-full mt-1 outline-none focus:outline-none"
								min="0"
								max={totalTime}
								value={currentTime}
								onChange={handleSliderChange}
								onMouseDown={handleSliderMouseDown}
								onMouseUp={handleSliderMouseUp}
								style={{
									background: `linear-gradient(to right, blue ${
										(currentTime / totalTime) * 100
									}%, white ${(currentTime / totalTime) * 100}%)`,
									marginTop: "-30px",
									transition: isVideoPlaying ? "none" : "all 0.3s ease-out"
								}}
							/>
						</div>
					)}
					<div className="flex justify-between items-center pt-2 pb-3 px-3">
						<div className="flex gap-2">
							<div onClick={togglePlay}>
								{isVideoPlaying ? (
									<IoMdPause className="text-white text-xl" />
								) : (
									<IoMdPlay className="text-white text-xl" />
								)}
							</div>
							<div className="">
								{volume === 0 ? (
									<MdVolumeOff className="text-white text-2xl" />
								) : volume < 0.5 ? (
									<MdVolumeDown className="text-white text-2xl" />
								) : (
									<MdVolumeUp className="text-white text-2xl" />
								)}
							</div>
							<input
								className="w-[80px] appearance-none h-[7px] mt-[9px] bg-gray-400 rounded-full outline-none focus:outline-none"
								type="range"
								min="0"
								max="1"
								step="0.1"
								value={volume}
								onChange={handleVolumeChange}
								style={{
									background: `linear-gradient(to right, blue ${(volume / 1) * 100}%, white ${
										(volume / 1) * 100
									}%)`,
									transition: isVideoPlaying ? "none" : "all 0.3s ease-out"
								}}
							/>
							<div className="text-white tracking-wide font-semibold">
								{formatTime(Number(currentTime.toFixed(0)))} /{" "}
								{formatTime(Number(totalTime.toFixed(0)))}
							</div>
						</div>
						<div className="flex gap-4">
							<div className="cursor-pointer text-white relative">
								{showPlaybackSpeedOption ? (
									<div className="absolute bg-lightBlack  -top-[165px] -right-[20px] rounded-[10px] w-[70px]">
										<div
											className="py-2 px-4 flex gap-1 hover:bg-greyBlack cursor-pointer"
											onClick={() => handlePlaybackSpeedChange(0.5)}
										>
											0.5x {playbackSpeed === 0.5 ? <span>&#10003;</span> : null}
										</div>
										<div
											className="py-2 px-4 flex gap-1 hover:bg-greyBlack cursor-pointer"
											onClick={() => handlePlaybackSpeedChange(1)}
										>
											1x {playbackSpeed === 1 ? <span>&#10003;</span> : null}
										</div>
										<div
											className="py-2 px-4 flex gap-1 hover:bg-greyBlack cursor-pointer"
											onClick={() => handlePlaybackSpeedChange(1.5)}
										>
											1.5x {playbackSpeed === 1.5 ? <span>&#10003;</span> : null}
										</div>
										<div
											className="py-2 px-4 flex gap-1 hover:bg-greyBlack cursor-pointer"
											onClick={() => handlePlaybackSpeedChange(2)}
										>
											2x {playbackSpeed === 2 ? <span>&#10003;</span> : null}
										</div>
									</div>
								) : null}
								<MdOutlineSpeed
									className="text-[20px] mt-[3px]"
									onClick={() =>
										setShowPlaybackSpeedOption(
											(prevShowPlaybackSpeedOption: boolean) => !prevShowPlaybackSpeedOption
										)
									}
								/>
							</div>
							<div className="cursor-pointer text-white" onClick={togglePictureInPicture}>
								<CgMiniPlayer className="text-[20px] mt-[3px]" />
							</div>
							<div className="cursor-pointer text-white" onClick={handleDownload}>
								<FaDownload className="text-[15px] mt-1" />
							</div>
							<div className="cursor-pointer text-white" onClick={toggleFullscreen}>
								<MdFullscreen className="text-[25px]" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
