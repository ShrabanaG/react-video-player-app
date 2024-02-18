import { ContinueWatchingVideosProps } from "../../@types/propTypes/videoProps.types";
import { FC } from "react";
import { Video } from "../../@types/videos.types";
import ContinueWatchedVideo from "./continueWatchedVideo/ContinueWatchVideo";

const ContinueWatchedVideos: FC<ContinueWatchingVideosProps> = ({
	videos
}: ContinueWatchingVideosProps): JSX.Element => {
	return (
		<div className="watching-videos flex items-center  justify-start flex-wrap gap-10">
			{videos.map((video: Video, index: number) => {
				return <ContinueWatchedVideo video={video} key={index} />;
			})}
		</div>
	);
};

export default ContinueWatchedVideos;
