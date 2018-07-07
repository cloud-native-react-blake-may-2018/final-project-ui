import React from 'react'

// const initialState = {
//   quizzes: [],
//   questions: [],
//   tags: []
// }

export const quizzesReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case 'ALL_QUIZZES':
      console.log('quizzes ', action.quizzes)
      return {
        ...state,
        quizzes: [...action.quizzes]
      }

    case 'DISPLAY_QUIZ_QUESTIONS':
      // console.log('questions ', action.questions)
      return {
        ...state,
        questions: action.questions
      }

    case 'DISPLAY_QUIZ_TAGS':
      // console.log('tags ', action.tags)
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
