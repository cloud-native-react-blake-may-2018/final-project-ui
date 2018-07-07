import React from "react";

const initialState = {
  quizID: "f01ac32d-09db-42cd-806a-d1cea45bfdf5",
  questionIDs: []
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
      // let idArr = [];
      // for (let i of action.questions) {
      //   idArr.push(i.uuid);
      // }
      return {
        ...state,
        questionIDs: [...action.questions.map(question => question.uuid)]
      };

    case "ADD_JUNCTION":
      return {
        ...state,
        questionIDs: []
      };

    default:
      return initialState;
  }
};
