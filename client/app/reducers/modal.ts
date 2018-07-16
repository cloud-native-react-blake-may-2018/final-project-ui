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
<<<<<<< HEAD
        quizTitle: action.quizTitle && action.quizTitle
=======
        questionUUID: action.questionUUID
>>>>>>> 94b82c8b9e2922249a11c98a292740cb1103f24d
      }

    case 'HIDE_MODAL':
      return initialModalState

    default:
      return state
  }
}
