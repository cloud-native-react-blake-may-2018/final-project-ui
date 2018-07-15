export const loadModal = (modalType, quizTitle) => ({
  type: 'SHOW_MODAL',
  modalType,
  quizTitle
})

// set modalType to null in redux store
export const hideModal = () => ({
  type: 'HIDE_MODAL'
})
