import React from 'react'
import { connect } from 'react-redux'

// import all modal components
import SubmitQuizModal from './modals/SubmitQuizModal'

// import modal type constants
import { SUBMIT_QUIZ_MODAL } from '../constants/modaltypes'

// modal directory based on props.modalType
const MODAL_COMPONENTS = {
  SUBMIT_QUIZ_MODAL: SubmitQuizModal
}

const ModalContainer = props => {
  // if no modal set in store, do not render one
  if (!props.modalType) {
    return null
  }

  // object lookup
  const SpecificModal = MODAL_COMPONENTS[props.modalType]

  return <SpecificModal />
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType
})

export default connect(mapStateToProps)(ModalContainer)
