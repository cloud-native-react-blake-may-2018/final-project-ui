export const loadModal = (modalType, questionUUID) => ({
  type: 'SHOW_MODAL',
  modalType,
  questionUUID
})

// set modalType to null in redux store
export const hideModal = () => ({
  type: 'HIDE_MODAL'
})
