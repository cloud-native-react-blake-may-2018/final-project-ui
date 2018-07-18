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
        ...state,
        sidebarOpen: action.bool
      }

    case 'USER_POINTS':
      return {
        ...state,
        points: action.points.points
      }

    case 'ALL_POINTS':
      return {
        ...state,
        allPoints: action.points.sort((a, b) => b.points - a.points).slice(0, 3)
      }

    default:
      return state
  }
}
