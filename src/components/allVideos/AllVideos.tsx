import { FC } from "react";
import { AllVideosProps } from "../../@types/propTypes/videoProps.types";
import { Video as VideoType } from "../../@types/videos.types";
import Video from "./video/Video";

const AllVideos: FC<AllVideosProps> = ({ videos }: AllVideosProps): JSX.Element => {
	return (
		<div className="all-videos flex flex-wrap  items-start gap-4 justify-start">
			{videos.map((video: VideoType, index: number) => {
				return <Video video={video} key={index} />;
			})}
		</div>
	);
};

export default AllVideos;
