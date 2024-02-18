/* eslint-disable prettier/prettier */
import { useDarkMode } from "../../hooks";
import MyLogo from "../../assets/avatar.png";

import { RiVideoUploadLine } from "react-icons/ri";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";
import { GiLighthouse } from "react-icons/gi";
import "./topbar.css";

const Topbar = () => {
	const { theme, toggle } = useDarkMode();

	return (
		<section className="topbar">
			<div className="topbar-upload-btn flex-center">
				<span>Upload Video</span>
				<span className="ml-3">
					<RiVideoUploadLine fontSize={20} />
				</span>
			</div>
			<div className="">
				<div className="cursor-pointer text-[35px] mb-1 dark:text-white text-violet" onClick={() => window.open("https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Freact-video-player-60552.web.app%2F&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext")}><GiLighthouse /></div>
			</div>
			<div className="flex ml-5">
				<span>
					<img src={MyLogo} alt="my-logo" className="inline-block ring-2 w-10 h-10 rounded-full " />
				</span>
				<span className="ml-2 text-primary-500 font-semibold flex-center dark:text-white">Hii Rigi</span>
			</div>
			<div
				data-testid="theme-toggle"
				className="bg-primary-30 border-2 text-primary-50 rounded-full p-2 cursor-pointer"
				onClick={toggle}
			>
				{theme === "dark" && <MdOutlineLightMode fontSize={20} />}
				{theme === "light" && <MdOutlineModeNight fontSize={20} />}
			</div>
		</section>
	);
};

export default Topbar;
