import React, { FC, useRef, useState, useEffect, KeyboardEvent } from "react";
import { VideoPlayerProps } from "../../../@types/propTypes/videoPlayerProps.types";
import { Video } from ".";
import "./videoPlayer.css";

interface Annotation {
	id: string;
	time: number;
	text: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ src }: VideoPlayerProps): JSX.Element => {
	const videoPlayerRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const [volume, setVolume] = useState(1);
	const [autoPlay, setAutoPlay] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState(1); // State for playback speed
	const [isLooping, setIsLooping] = useState(false); // State for video looping
	const [annotations, setAnnotations] = useState<Annotation[]>([]); // State for annotations

	useEffect(() => {
		if (videoPlayerRef.current) {
			videoPlayerRef.current.autoplay = autoPlay;
			videoPlayerRef.current.muted = !autoPlay; // Mute if autoplay is enabled
			videoPlayerRef.current.playbackRate = playbackSpeed; // Set initial playback speed
			videoPlayerRef.current.loop = isLooping; // Enable looping

			const handleTimeUpdate = () => {
				if (videoPlayerRef.current) {
					setCurrentTime(videoPlayerRef.current.currentTime);
					setDuration(videoPlayerRef.current.duration);
				}
			};

			videoPlayerRef.current.addEventListener("timeupdate", handleTimeUpdate);

			return () => {
				videoPlayerRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
			};
		}
	}, [autoPlay, playbackSpeed, isLooping]);

	useEffect(() => {
		const fullscreenChangeHandler = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", fullscreenChangeHandler);

		return () => {
			document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent<Document>) => {
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
		};

		document.addEventListener("keydown", handleKeyDown as unknown as EventListener);

		return () => {
			document.removeEventListener("keydown", handleKeyDown as unknown as EventListener);
		};
	}, []);

	const togglePlay = () => {
		if (videoPlayerRef?.current?.paused) {
			videoPlayerRef.current.currentTime = 0;
			videoPlayerRef.current.play();
			setIsPlaying(true);
		} else {
			videoPlayerRef?.current?.pause();
			setIsPlaying(false);
		}
		setThumbnail(null);
	};

	const captureThumbnail = () => {
		if (videoPlayerRef.current) {
			const originalTime = videoPlayerRef.current.currentTime;
			videoPlayerRef.current.currentTime = 52;
			setTimeout(() => {
				if (videoPlayerRef.current) {
					const canvas = document.createElement("canvas");
					canvas.width = videoPlayerRef.current.videoWidth;
					canvas.height = videoPlayerRef.current.videoHeight;
					const ctx = canvas.getContext("2d");
					if (ctx) {
						ctx.drawImage(videoPlayerRef.current, 0, 0, canvas.width, canvas.height);
						const thumbnailURL = canvas.toDataURL();
						setThumbnail(thumbnailURL);
					}
				}
			}, 500);
		}
	};

	useEffect(() => {
		if (videoPlayerRef.current) {
			const handleLoadedMetadata = () => {
				captureThumbnail();
				setDuration(videoPlayerRef.current?.duration || 0);
			};

			videoPlayerRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
			return () => {
				videoPlayerRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
			};
		}
	}, []);

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
		if (!isDragging) {
			if (videoPlayerRef.current) videoPlayerRef.current.currentTime = newTime;
		}
	};

	const handleSliderMouseDown = () => {
		setIsDragging(true);
		if (videoPlayerRef.current) {
			if (videoPlayerRef.current.paused) {
				setWasPlayingBeforeDrag(false);
			} else {
				setWasPlayingBeforeDrag(true);
				videoPlayerRef.current.pause();
			}
		}
	};

	const handleSliderMouseUp = () => {
		setIsDragging(false);
		if (videoPlayerRef.current) {
			videoPlayerRef.current.currentTime = currentTime;
			if (wasPlayingBeforeDrag) {
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

	const handleAddAnnotation = () => {
		if (videoPlayerRef.current) {
			const newAnnotation: Annotation = {
				id: `${Date.now()}`, // Generate unique ID
				time: currentTime,
				text: "Your annotation text here"
			};
			setAnnotations((prevAnnotations: Annotation[]) => [...prevAnnotations, newAnnotation]);
		}
	};

	const handleAnnotationDrag = (event: React.DragEvent<HTMLDivElement>, id: string) => {
		if (videoPlayerRef.current) {
			const rect = videoPlayerRef.current.getBoundingClientRect();
			const videoX = rect.left;
			const newTime = ((event.clientX - videoX) / rect.width) * duration;
			setAnnotations((prevAnnotations: Annotation[]) =>
				prevAnnotations.map((annotation: Annotation) =>
					annotation.id === id ? { ...annotation, time: newTime } : annotation
				)
			);
		}
	};

	const handleAnnotationTextChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
		const newText = event.target.value;
		setAnnotations((prevAnnotations: Annotation[]) =>
			prevAnnotations.map((annotation: Annotation) =>
				annotation.id === id ? { ...annotation, text: newText } : annotation
			)
		);
	};

	return (
		<div className="video-player" style={{ width: "600px", height: "auto" }}>
			<div id="wrap" style={{ position: "relative", width: "100%", height: "auto" }}>
				<video
					ref={videoPlayerRef}
					src={Video}
					controls={false}
					onLoadedData={captureThumbnail}
					style={{ width: "100%", height: "auto" }}
				></video>
				{thumbnail && (
					<img
						src={thumbnail}
						alt="Thumbnail"
						style={{ width: "100%", height: "auto", position: "absolute", top: 0, left: 0 }}
					/>
				)}
				<div onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</div>
				<input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
				<button onClick={toggleAutoPlay}>{autoPlay ? "Disable Autoplay" : "Enable Autoplay"}</button>
				<input
					type="range"
					min="0"
					max={duration}
					value={currentTime}
					onChange={handleSliderChange}
					onMouseDown={handleSliderMouseDown}
					onMouseUp={handleSliderMouseUp}
					style={{ transition: isDragging ? "none" : "all 0.3s ease-out" }}
				/>
				<div>
					{currentTime.toFixed(0)} / {duration.toFixed(0)}
				</div>
				<button onClick={toggleFullscreen}>Toggle Fullscreen</button>
				<select
					value={playbackSpeed}
					onChange={(e: any) => handlePlaybackSpeedChange(parseFloat(e.target.value))}
				>
					<option value={0.5}>0.5x</option>
					<option value={1}>1x</option>
					<option value={1.5}>1.5x</option>
					<option value={2}>2x</option>
				</select>
				<button onClick={togglePictureInPicture}>Toggle Picture-in-Picture</button>
				<button onClick={handleLoopToggle}>{isLooping ? "Disable Looping" : "Enable Looping"}</button>
				<button onClick={handleDownload}>Download</button>
				<button onClick={handleAddAnnotation}>Add Annotation</button>
				{/* Render annotations */}
				{annotations.map((annotation: Annotation) => (
					<div
						key={annotation.id}
						style={{
							position: "absolute",
							top: 0,
							left: `${(annotation.time / duration) * 100}%`,
							cursor: "move",
							zIndex: 999
						}}
						draggable
						onDrag={(event: any) => handleAnnotationDrag(event, annotation.id)}
					>
						<input
							type="text"
							value={annotation.text}
							onChange={(event: any) => handleAnnotationTextChange(event, annotation.id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default VideoPlayer;
