import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ArrowIcon from '../../public/icons/arrow-icon.svg'
import Spinner from 'react-spinkit'
import { startGetSearchedQuiz, startQuizAttempt } from '../actions/quizzes'
import { loadModal } from '../actions/modal'
import { REPORT_QUIZ_MODAL } from '../constants/modaltypes'
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome'

interface IProps {
  history?: any
  match?: any
  username: any
  quizzes: any
  quiz: any
  randomGradient: string
  gradientColor: string
  startQuizAttempt: (quizUUID: any, username: any, reset: number) => void
  startGetSearchedQuiz: (uuid: any) => any
  loadModal: (string) => any
}

export class ViewQuizPage extends Component<IProps> {
  state = {
    clickedQuestion: [],
    questionNumber: 0,
    index: Math.floor(Math.random() * 5)
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  reportQuizModal = () => this.props.loadModal(REPORT_QUIZ_MODAL)

  public showQuizQuestion = (question: any, count: number, e: any) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      questionNumber: count,
      clickedQuestion: [question]
    })
  }
  public startQuizAttempt = (e: any) => {
    this.props.startQuizAttempt(this.quizUUID, this.props.username, 0)
  }

  goBack = () => this.props.history.goBack()

  randomGradient = [
    'red-orange',
    'red-blue',
    'blue-light-teal',
    'midnight-violet',
    'midnight-orange'
  ]

  // @ts-ignore
  render = () => {
    const { quiz } = this.props
    const { index } = this.state
    return (
      <div className="view-quiz-page">
        {quiz.questions === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {quiz.questions !== undefined && (
          <div className="main">
            <main className={this.randomGradient[index]}>
              <ArrowIcon className="back" onClick={this.goBack} />
              <div className="icon" onClick={this.reportQuizModal}>
                <FontAwesomeIcon icon="ellipsis-h" className="menu" />
              </div>
              <p className="author">By: {quiz.author}</p>
              <h1 className="title">{quiz.title}</h1>
              <h2 className="total">{quiz.questions.length} questions</h2>
            </main>
            <footer>
              <Link to={`/edit-quiz/${quiz.uuid}`} className="link">
                <p className="edit-button">Edit quiz</p>
              </Link>
              <Link
                to={`/take-quiz/${quiz.uuid}`}
                onClick={this.startQuizAttempt}
                className="link"
              >
                <p className="take-button">Take quiz</p>
              </Link>
            </footer>
          </div>
        )}
      </div>
    )
  }
}

// flag 1: quizzes.quizzes -> quizzes.all
const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz:
    state.quizzes.all !== undefined &&
    state.quizzes.all.find(quiz => quiz.uuid === props.match.params.uuid),
  quizzes: state.quizzes.all
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect<any, any>(
  mapStateToProps,
  { startGetSearchedQuiz, startQuizAttempt, loadModal }
)(ViewQuizPage)
