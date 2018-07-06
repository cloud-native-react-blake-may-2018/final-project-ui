import React from 'react'

const initialState = {
  quizzes: [],
  questions: [],
  tags: []
}

export const quizReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'DISPLAY_QUIZZES':
      return {
        ...state,
        quizzes: action.quiz
      }

    case 'DISPLAY_QUIZ_QUESTIONS':
      return {
        ...state,
        questions: action.questions
      }

    case 'DISPLAY_QUIZ_TAGS':
      return {
        ...state,
        tags: action.tags
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
