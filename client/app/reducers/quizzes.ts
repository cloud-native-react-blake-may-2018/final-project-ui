import React from 'react'

export const quizzesReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case 'DISPLAY_QUIZZES':
      return {
        ...state,
        quizzes: action.quizzes
      }

    case 'CREATE_QUIZ':
      return {
        ...state,
        quizzes: action.quizzes
      }

    case 'EDIT_QUIZ':
      return {
        ...state,
        quizzes: action.quizzes
      }

    default:
      return state
  }
}
