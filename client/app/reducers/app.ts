import React from 'react'

const initialState = {}

export const appReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        dataIsHere: true
      }

    case 'LOGOUT':
      return {}

    default:
      return initialState
  }
}
