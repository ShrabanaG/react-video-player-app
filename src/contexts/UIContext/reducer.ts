import { Store } from "../../@types/contexts/UIContext/store.types";
import { UIAction } from "../../@types/contexts/UIContext/UIAction.types";
import actions from "./actions";

const reducer = (state: Store, action: UIAction) => {
	switch (action.type) {
		case actions.SET_SELETED_TAB: {
			return {
				...state,
				index: action.payload.index
			};
		}
		default:
			throw new Error("Unexpected action: UI Context");
	}
};

export default reducer;
