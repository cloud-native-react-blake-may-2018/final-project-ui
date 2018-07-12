import React from 'react'

const initialState = {
  sidebarOpen: true
}

export const appReducer = (state = initialState as any, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        dataIsHere: true
      }

    case 'LOGOUT':
      return {}

    case 'SIDEBAR':
      return {
        sidebarOpen: action.bool
      }

    default:
      return initialState
  }
}
