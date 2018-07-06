import React from 'react'

const initialState = {
  quizzes: []
}

export const quizReducer = (state = initialState, action = {} as any) => {
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
