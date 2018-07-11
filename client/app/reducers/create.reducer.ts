import React from 'react'

const initialState = {
<<<<<<< HEAD
  quizID: "a05189ad-4ada-4794-ab86-9be8d779328f",
=======
  quizID: '',
>>>>>>> 407561e30cb4c2a3dd7d4a9c59e2890ca52ee124
  questionIDs: []
}

export const createReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'CREATE_NEW_QUESTION':
      return {
        ...state
      }
    case 'CREATE_NEW_QUIZ':
      return {
        ...state,
        quizID: action.quizID
      }
    case 'UPDATE_QUIZ_ID':
      return {
        ...state,
        quizID: action.quizID
      }
    case 'BATCH_CREATE_QUESTIONS':
      return {
        ...state,
        questionIDs: [...action.questions.map(question => question.uuid)]
      }

    case 'ADD_JUNCTION':
      return {
        ...state,
        questionIDs: []
      }

    default:
      return initialState
  }
}
