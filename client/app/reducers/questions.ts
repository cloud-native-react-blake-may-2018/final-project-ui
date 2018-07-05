import React from 'react'

export const quizReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case 'DISPLAY_QUESTIONS':
      return {
        ...state,
        questions: action.questions
      }

    case 'CREATE_QUESTION':
      return {
        ...state,
        questions: action.questions
      }

    case 'EDIT_QUESTION':
      return {
        ...state,
        questions: action.questions
      }

    default:
      return state
  }
}
