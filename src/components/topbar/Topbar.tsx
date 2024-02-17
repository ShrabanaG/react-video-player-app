/* eslint-disable prettier/prettier */
import { RiVideoUploadLine } from "react-icons/ri";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";

import MyLogo from "../../assets/avatar.png";

import "./topbar.css";

const Topbar = () => {
	 document.documentElement.classList.add("dark");
	//document.documentElement.classList.remove("dark");
	
	return (
		<section className="topbar">
			<div className="topbar-upload-btn flex-center">
				<span>Upload Video</span>
				<span className="ml-3">
					<RiVideoUploadLine fontSize={20} />
				</span>
			</div>
			<div className="flex ml-5">
				<span>
					<img 
					src={MyLogo} alt="my-logo" className="inline-block ring-2 w-10 h-10 rounded-full " />
				</span>
				<span className="ml-2 text-primary-500 font-semibold flex-center dark:text-white">Hii Rigi</span>
			</div>
			<div className="bg-primary-30 border-2 text-primary-50 rounded-full p-2">
				<MdOutlineLightMode fontSize={20} />
			</div>
		</section>
	);
};

export default Topbar;
