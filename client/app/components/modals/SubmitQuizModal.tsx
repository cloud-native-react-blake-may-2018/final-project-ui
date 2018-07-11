import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'
import { submitQuizAttempt } from '../../actions/quizzes'
import { RouteProps, withRouter } from 'react-router'

interface IProps extends RouteProps {
  hideModal: () => any
  quiz: any
  history: any
  username: any
  answerArray: any
  submitQuizAttempt: (
    quizUUID: string,
    user: string,
    attemptUUID: string,
    answerArray: any[]
  ) => void
}

export class SubmitQuizModal extends Component<IProps> {
  constructor(props) {
    super(props)
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  onClose = () => this.props.hideModal()

  public submit = (e: any) => {
    e.preventDefault()
    console.log('in submit modal')
    console.log(
      this.quizUUID,
      this.props.username,
      this.props.quiz.attemptUUID,
      this.props.answerArray
    )

    this.props.submitQuizAttempt(
      this.quizUUID,
      this.props.username,
      this.props.quiz.attemptUUID,
      this.props.answerArray
    )
    this.onClose()
    this.props.history.push('/quiz-results')
  }

  // @ts-ignore
  render = () => {
    return (
      <Modal onClose={this.onClose}>
        <h1>Ready to Submit?</h1>
        <button onClick={this.submit} className="submit-button">
          Submit
        </button>
      </Modal>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quizzes: state.quizzes.quizAttemptInfoObj,
  quiz:
    state.takeQuiz.quizAttemptInfoObj !== null &&
    state.takeQuiz.quizAttemptInfoObj,
  answerArray: state.takeQuiz.answerArray
})

export default withRouter(
  connect(
    mapStateToProps,
    { hideModal, submitQuizAttempt }
  )(SubmitQuizModal)
)
