import React from 'react'

interface ITakeQuiz {
  questionNumber: number
  quizAttemptInfoObj: any
}

const initialState: ITakeQuiz = {
  questionNumber: 0,
  quizAttemptInfoObj: null
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

    case 'QUIZ_ATTEMPT_INFO':
      console.log('questions ', action.quizAttemptInfo)
      return {
        ...state,
        quizAttemptInfoObj: action.quizAttemptInfo
      }

    default:
      return state
  }
}
