import { useEffect, useState } from "react";
import useQuery from "./useQuery";

const useRouteParam = (searchString: "vid" | "pid"): string | number | undefined | null => {
	const [routeParam, setRouteParam] = useState<string | number>();
	const query = useQuery();

	useEffect(() => {
		if (query && query.get(searchString)) {
			if (searchString === "vid") {
				setRouteParam(query.get("vid") as string);
			} else if (searchString === "pid") {
				setRouteParam(query.get("pid") as string);
			}
		}
	}, [query, searchString]);

	return routeParam ? routeParam : null;
};

export default useRouteParam;
