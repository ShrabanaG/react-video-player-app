import { useCallback, useContext } from "react";
import { UIContext } from "../contexts";

const useTabIndex = () => {
	const { index, setIndex } = useContext(UIContext);

	const setSelectedTab = useCallback(
		(_index: number) => {
			setIndex(_index);
		},
		[setIndex]
	);

	return { index, setSelectedTab };
};

export default useTabIndex;
