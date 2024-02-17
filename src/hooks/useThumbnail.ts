import { useCallback, useEffect, useState } from "react";
import { useThumbnailProps } from "../@types/propTypes/hooksProps.types";

const useThumbnail = () => {
	const [thumbnail, setThumbnail] = useState<string | null>(null);

	const captureThumbnail = useCallback((videoPlayerRef: React.RefObject<HTMLVideoElement>) => {
		if (videoPlayerRef.current) {
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
	}, []);

	const removeThumbnail = () => setThumbnail(null);

	return { thumbnail, captureThumbnail, removeThumbnail };
};

export default useThumbnail;
