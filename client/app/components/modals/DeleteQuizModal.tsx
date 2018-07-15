import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'
// import { deleteQuiz } from '../../actions/quizzes'
import { RouteProps, withRouter } from 'react-router'

interface IProps {
  hideModal: () => any
}

export class SubmitQuizModal extends Component<IProps> {
  onClose = () => this.props.hideModal()

  deleteQuiz = () => console.log('deleting quiz...')

  // @ts-ignore
  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <div className="delete-quiz-modal">
          <div className="close" onClick={this.onClose}>
            <FontAwesomeIcon icon="times" />
          </div>
          <p className="title">Are you sure you want to delete this quiz?</p>
          <p className="subhead">
            This action is permanent and cannot be undone.
          </p>

          <div className="button-group">
            <button onClick={this.onClose} className="cancel">
              Cancel
            </button>
            <button onClick={this.deleteQuiz} className="submit">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username
})

export default withRouter(
  connect(
    mapStateToProps,
    { hideModal }
  )(SubmitQuizModal)
)
