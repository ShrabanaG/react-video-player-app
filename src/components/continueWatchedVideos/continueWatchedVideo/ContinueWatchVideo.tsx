import { FC, useCallback } from "react";
import { ContinueWatchingVideoProps } from "../../../@types/propTypes/videoProps.types";
import VideoPlayer from "../../videoPlayer/VideoPlayer";
import VideoCard from "../../videoCards/VideoCards";
import { useNavigate } from "react-router-dom";

const ContinueWatchedVideo: FC<ContinueWatchingVideoProps> = ({ video }: ContinueWatchingVideoProps): JSX.Element => {
	const navigate = useNavigate();

	const handleVideoClick = useCallback(() => {
		navigate(`/video?vid=${video.id}`);
	}, [navigate, video?.id]);

	return (
		<div className="continue-watched-video">
			<div className="video-containe cursor-pointer" onClick={handleVideoClick}>
				<VideoCard size="large" video={video} />
			</div>
		</div>
	);
};

export default ContinueWatchedVideo;
