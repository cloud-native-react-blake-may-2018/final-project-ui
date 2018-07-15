import React from 'react'

const initialModalState = {
  modalType: null
}

export const modalReducer = (state = initialModalState, action = {} as any) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        modalType: action.modalType,
        quizTitle: action.quizTitle && action.quizTitle
      }

    case 'HIDE_MODAL':
      return initialModalState

    default:
      return state
  }
}
