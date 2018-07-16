import React from "react";

const initialState = {
  quizID: ""
  // readyNewQuestion: false
};

export const createReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case "CREATE_NEW_QUESTION":
      return {
        ...state
      };
    case "CREATE_NEW_QUIZ":
      return {
        ...state,
        quizID: action.quizID
      };
    case "BATCH_CREATE_QUESTIONS":
      return {
        ...state,
        readyNewQuestion: false
      };
    case "UPDATE_STORE_QUIZ_ID":
      return {
        ...state,
        quizID: action.quizID,
        readyNewQuestion: true
      };

    case "ADD_JUNCTION":
      return {
        ...state
      };

    default:
      return initialState;
  }
};
