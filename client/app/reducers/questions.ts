import React from "react";

export const questionsReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case "DISPLAY_QUESTIONS":
      return {
        ...state,
        questions: action.questions
      };

    case "CREATE_QUESTION":
      return {
        ...state,
        questions: action.questions
      };

    case "EDIT_QUESTION":
      return {
        ...state
        // questions: action.questions
      };

    case "DELETE_QUESTION":
      return {
        ...state
      };

    case "DELETE_JUNCTION":
      return {
        ...state
      };

    default:
      return state;
  }
};
