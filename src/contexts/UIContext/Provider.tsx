/* eslint-disable react-hooks/exhaustive-deps */
import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useReducer, useCallback } from "react";
import UIContext from "./UIContext";
import { ContextProviderProps } from "../../@types/contexts/context.types";

const UIContextProvider = ({ children }: ContextProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = {
		index: state.index,
		setIndex: useCallback((index: number) => {
			dispatch({ type: actions.SET_SELETED_TAB, payload: { ...state, index } });
		}, [])
	};

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIContextProvider;
