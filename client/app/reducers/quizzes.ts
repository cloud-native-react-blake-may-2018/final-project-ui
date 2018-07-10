import React from "react";

const initialState = {
  quizzes: [],
  editedQuiz: {}
  //   questions: [],
  //   tags: []
};

export const quizzesReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case "ALL_QUIZZES":
      // console.log('quizzes ', action.quizzes)
      return {
        ...state,
        quizzes: [...action.quizzes]
      };

    case "DISPLAY_QUIZ_QUESTIONS":
      // console.log('questions ', action.questions)
      return {
        ...state,
        questions: action.questions
      };

    case "DISPLAY_CLICKED_QUESTION":
      // console.log('questions ', action.questions)
      return {
        ...state,
        clickedQuestion: action.clickedQuestion
      };

    case "ADD_ANSWER_TO_OBJECT":
      console.log("answer ", action.answer);
      return {
        ...state,
        // answerObject: [...action.answer]
        answerArray: action.answerObj
      };

    case "DISPLAY_CLICKED_QUESTION":
      // console.log('questions ', action.questions)
      return {
        ...state,
        clickedQuestion: action.clickedQuestion
      };

    case "DISPLAY_QUIZ_TAGS":
      // console.log('tags ', action.tags)
      return {
        ...state,
        tags: action.tags
      };

    case "CREATE_QUIZ":
      return {
        ...state,
        quizzes: action.quizzes
      };

    case "EDIT_QUIZ":
      return {
        ...state,
        quizzes: action.quiz
      };

    case "EDIT_STORE_QUIZ":
      return {
        ...state,
        quizzes: action.quizzes
      };
    default:
      return state;
  }
};
