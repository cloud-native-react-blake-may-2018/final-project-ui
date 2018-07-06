import React from 'react'

<<<<<<< HEAD:client/app/reducers/quizzes.ts
export const quizzesReducer = (state = {}, action = {} as any) => {
=======
const initialState = {
  quizzes: [],
  questions: [],
  tags: []
}

export const quizReducer = (state = initialState, action = {} as any) => {
>>>>>>> 70c2e7c148814d528d1961a71c2ae55b882e8442:client/app/reducers/quiz.ts
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
