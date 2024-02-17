import { FC, useCallback, useEffect, useRef, useState } from "react";
import { VideoPlayerProps } from "../../@types/propTypes/videoPlayerProps.types";
import { useThumbnail } from "../../hooks";

import "./videoPlayer.css";

const VideoPlayer: FC<VideoPlayerProps> = ({ src }: VideoPlayerProps): JSX.Element => {
	const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>();
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

	const togglePlay = useCallback(() => {
		if (videoPlayerRef?.current?.paused) {
			videoPlayerRef.current.currentTime = 0;
			videoPlayerRef.current.play();
			setIsVideoPlaying(true);
		} else {
			videoPlayerRef?.current?.pause();
			setIsVideoPlaying(false);
		}
		removeThumbnail();
	}, [removeThumbnail]);

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

	return (
		<div className="video-player" style={{ width: "600px", height: "auto" }}>
			<div id="wrap" style={{ position: "relative", width: "100%", height: "auto" }}>
				<video
					ref={videoPlayerRef}
					src={src}
					controls={false}
					onLoadedData={() => captureThumbnail(videoPlayerRef)}
					style={{ width: "100%", height: "auto" }}
					loop={isLooping}
					onClick={togglePlay}
				></video>
				{thumbnail && (
					<img
						src={thumbnail}
						alt="Thumbnail"
						style={{ width: "100%", height: "auto", position: "absolute", top: 0, left: 0 }}
					/>
				)}
				<div onClick={togglePlay}>{isVideoPlaying ? "Pause" : "Play"}</div>
				<input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
				<button onClick={toggleAutoPlay}>{autoPlay ? "Disable Autoplay" : "Enable Autoplay"}</button>
				<input
					type="range"
					min="0"
					max={totalTime}
					value={currentTime}
					onChange={handleSliderChange}
					onMouseDown={handleSliderMouseDown}
					onMouseUp={handleSliderMouseUp}
					style={{ transition: isVideoPlaying ? "none" : "all 0.3s ease-out" }}
				/>
				<div>
					{currentTime.toFixed(0)} / {totalTime.toFixed(0)}
				</div>
				<button onClick={toggleFullscreen}>Toggle Fullscreen</button>
				<select
					value={playbackSpeed}
					onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
						handlePlaybackSpeedChange(parseFloat(event.target.value))
					}
				>
					<option value={0.5}>0.5x</option>
					<option value={1}>1x</option>
					<option value={1.5}>1.5x</option>
					<option value={2}>2x</option>
				</select>
				<button onClick={togglePictureInPicture}>Toggle Picture-in-Picture</button>
				<button onClick={handleLoopToggle}>{isLooping ? "Disable Looping" : "Enable Looping"}</button>
				<button onClick={handleDownload}>Download</button>
			</div>
		</div>
	);
};

export default VideoPlayer;
