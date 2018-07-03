import React from "react";

const initialState = {};

export const createReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case "CREATE_NEW_QUESTION":
      return {
        ...state
      };
    case "CREATE_NEW_QUIZ":
      return {
        ...state
      };

    // default:
    //   return initialState
  }
};
