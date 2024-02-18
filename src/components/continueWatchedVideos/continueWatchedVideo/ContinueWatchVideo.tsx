import { FC } from "react";
import { ContinueWatchingVideoProps } from "../../../@types/propTypes/videoProps.types";
import VideoPlayer from "../../videoPlayer/VideoPlayer";
import VideoCard from "../../videoCards/VideoCards";

const ContinueWatchedVideo: FC<ContinueWatchingVideoProps> = ({ video }: ContinueWatchingVideoProps): JSX.Element => {
	return (
		<div className="continue-watched-video">
			<div className="video-container">
				<VideoCard size="large" video={video} />
			</div>
		</div>
	);
};

export default ContinueWatchedVideo;
