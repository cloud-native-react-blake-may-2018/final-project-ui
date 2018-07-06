import React from 'react'

const initialState = {
  quizID: 'test',
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

    default:
      return initialState
  }
}
