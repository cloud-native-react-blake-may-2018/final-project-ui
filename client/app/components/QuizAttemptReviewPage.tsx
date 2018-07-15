import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { RouteProps } from 'react-router'
import { Link } from 'react-router-dom'
import {
  startAddAnswerToArray,
  changeQuestionNumber,
  addMultipleSelectAnswer,
  addMultipleChoiceAnswer,
  updateMultipleSelectAnswer,
  updateAnswerArray,
  submitQuizAttempt,
  clearQuizAttempt
} from '../actions/quizzes'
import { loadModal } from '../actions/modal'
import {
  SUBMIT_QUIZ_MODAL,
  REPORT_QUESTION_MODAL
} from '../constants/modaltypes'
import Spinner from 'react-spinkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// interface IProps {
interface IProps extends RouteProps {
  username: any
  quiz: any
  quizAttempt: any
  questionNumber: any
  multipleSelectAnswer: any
  multipleChoiceAnswer: any[]
  answerArray: any
  history?: any
  clearQuizAttempt: (reset: number) => void
  loadModal: (any) => any
  changeQuestionNumber: (questionNumber: number) => void
  startAddAnswerToArray: (answerObj: {}) => void
  addMultipleChoiceAnswer: (answerObj: {}) => void
  addMultipleSelectAnswer: (answerObj: {}) => void
  updateMultipleSelectAnswer: (answerArray: any) => void
  updateAnswerArray: (answerArray: any[]) => void
  submitQuizAttempt: (
    quizUUID: string,
    user: string,
    attemptUUID: string,
    answerArray: any[]
  ) => void
}

const questionStyle = {
  cursor: 'pointer'
}

export class QuizAttemptReviewPage extends Component<IProps, any> {
  constructor(props) {
    super(props)
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]
  reatakeIndex = this.params[5]

  submitQuizModal = () => this.props.loadModal(SUBMIT_QUIZ_MODAL)

  reportQuestionModal = () => this.props.loadModal(REPORT_QUESTION_MODAL)

  // will take you to the previous question and update answer array
  // if a choice is selected
  public previousQuizQuestion = (e: any) => {
    e.preventDefault()
    this.props.changeQuestionNumber(this.props.questionNumber - 1)
  }

  // will take you to the next question and update answer array
  // if a choice is selected
  public nextQuizQuestion = (e: any) => {
    e.preventDefault()
    this.props.changeQuestionNumber(this.props.questionNumber + 1)
  }

  componentWillUnmount() {
    if (this.props.history.action === 'POP') {
      console.log('user has left page')
      this.props.clearQuizAttempt(0)
    }
  }

  // @ts-ignore
  render = () => {
    const { quiz, questionNumber, quizAttempt } = this.props
    return (
      <div className="take-quiz-page">
        {quiz !== null
          ? quiz.questions === undefined && (
              <Spinner
                className="loading-indicator"
                name="ball-spin-fade-loader"
              />
            )
          : quizAttempt[this.reatakeIndex].questions === undefined && (
              <Spinner
                className="loading-indicator"
                name="ball-spin-fade-loader"
              />
            )}
        {quiz !== null
          ? quiz.questions !== undefined && (
              <div className="main">
                <header>
                  <div className="meta">
                    <div className="container">
                      <p className="current">Question {questionNumber + 1}</p>
                      <div className="icon" onClick={this.reportQuestionModal}>
                        <FontAwesomeIcon icon="ellipsis-h" className="menu" />
                      </div>
                    </div>
                    <p className="title">{quiz.title}</p>
                    <p className="progress">
                      Question {questionNumber + 1}/{quiz.questions.length}
                    </p>
                  </div>
                  <p className="question">
                    {quiz.questions[questionNumber].title}
                  </p>
                </header>
                {/* DISPLAYS THE CHOICES */}
                <main>
                  <div className="choices">
                    {quiz.questions[questionNumber].answers.map(
                      (answers, i) => (
                        <div
                          key={i}
                          // key={answers.answer.answer}
                          className="choice"
                        >
                          <p>{answers.answer}</p>
                        </div>
                      )
                    )}
                  </div>
                  <div className="buttons">
                    {questionNumber !== 0 && (
                      <button
                        onClick={this.previousQuizQuestion}
                        className="previous-button"
                      >
                        previous
                      </button>
                    )}
                    {questionNumber + 1 !== quiz.questions.length ? (
                      <button
                        onClick={this.nextQuizQuestion}
                        className="next-button"
                      >
                        next
                      </button>
                    ) : (
                      <Link to={`/view-quiz/${this.quizUUID}`} className="link">
                        <p className="retake-button">Retake quiz</p>
                      </Link>
                    )}
                  </div>
                </main>
              </div>
            )
          : quizAttempt[this.reatakeIndex].questions !== undefined && (
              <div className="main">
                <header>
                  <div className="meta">
                    <div className="container">
                      <p className="current">Question {questionNumber + 1}</p>
                      <div className="icon" onClick={this.reportQuestionModal}>
                        <FontAwesomeIcon icon="ellipsis-h" className="menu" />
                      </div>
                    </div>
                    <p className="title">
                      {quizAttempt[this.reatakeIndex].title}
                    </p>
                    <p className="progress">
                      Question {questionNumber + 1}/{
                        quizAttempt[this.reatakeIndex].questions.length
                      }
                    </p>
                  </div>
                  <p className="question">
                    {
                      quizAttempt[this.reatakeIndex].questions[questionNumber]
                        .title
                    }
                  </p>
                </header>
                {/* DISPLAYS THE CHOICES */}
                <main>
                  <div className="choices">
                    {quizAttempt[this.reatakeIndex].questions[
                      questionNumber
                    ].answers.map((answers, i) => (
                      <div
                        key={i}
                        // key={answers.answer.answer}
                        className="choice"
                      >
                        <p>{answers.answer}</p>
                      </div>
                    ))}
                  </div>
                  <div className="buttons">
                    {questionNumber !== 0 && (
                      <button
                        onClick={this.previousQuizQuestion}
                        className="previous-button"
                      >
                        previous
                      </button>
                    )}
                    {questionNumber + 1 !==
                    quizAttempt[this.reatakeIndex].questions.length ? (
                      <button
                        onClick={this.nextQuizQuestion}
                        className="next-button"
                      >
                        next
                      </button>
                    ) : (
                      <Link to={`/view-quiz/${this.quizUUID}`} className="link">
                        <p className="retake-button">Retake quiz</p>
                      </Link>
                    )}
                  </div>
                </main>
              </div>
            )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz: state.takeQuiz.results,
  quizAttempt: state.quizzes.allAttempts,
  answers: state.takeQuiz.answers,
  answerArray: state.takeQuiz.answerArray,
  questionNumber: state.takeQuiz.questionNumber,
  multipleSelectAnswer: state.takeQuiz.multipleSelectAnswer,
  multipleChoiceAnswer: state.takeQuiz.multipleChoiceAnswer,
  done: state.takeQuiz.done
})

export default connect(
  mapStateToProps,
  {
    startAddAnswerToArray,
    changeQuestionNumber,
    addMultipleChoiceAnswer,
    addMultipleSelectAnswer,
    updateMultipleSelectAnswer,
    updateAnswerArray,
    submitQuizAttempt,
    loadModal,
    clearQuizAttempt
  }
)(QuizAttemptReviewPage)
