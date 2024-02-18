import { FC, useCallback } from "react";
import { VideoProps } from "../../../@types/propTypes/videoProps.types";
import VideoCard from "../../videoCards/VideoCards";
import { useNavigate } from "react-router-dom";

const Video: FC<VideoProps> = ({ video }: VideoProps): JSX.Element => {
	const navigate = useNavigate();

	const handleVideoClick = useCallback(() => {
		navigate(`/video?vid=${video.id}`);
	}, [navigate, video?.id]);

	return (
		<div className="continue-watched-video">
			<div className="video-container cursor-pointer" onClick={handleVideoClick}>
				<VideoCard size="small" video={video} />
			</div>
		</div>
	);
};

export default Video;
