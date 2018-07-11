import React from 'react'

interface ITakeQuiz {
  questionNumber: number
}

const initialState: ITakeQuiz = {
  questionNumber: 0
}

export const takeQuizReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'ALL_QUIZZES':
      // console.log('quizzes ', action.quizzes)
      return {
        ...state,
        quizzes: [...action.quizzes]
      }

    case 'CHANGE_QUESTION_NUMBER':
      console.log('questions ', action.questionNumber)
      return {
        ...state,
        questionNumber: action.questionNumber
      }

    default:
      return state
  }
}
