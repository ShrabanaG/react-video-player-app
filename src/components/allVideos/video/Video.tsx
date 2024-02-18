import { FC } from "react";
import { VideoProps } from "../../../@types/propTypes/videoProps.types";
import VideoCard from "../../videoCards/VideoCards";

const Video: FC<VideoProps> = ({ video }: VideoProps): JSX.Element => {
	return (
		<div className="continue-watched-video">
			<div className="video-container">
				<VideoCard size="small" video={video} />
			</div>
		</div>
	);
};

export default Video;
