import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import ImageGallery from 'react-image-gallery'
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
  submitQuizAttempt
} from '../actions/quizzes'
import { loadModal } from '../actions/modal'
import {
  SUBMIT_QUIZ_MODAL,
  REPORT_QUESTION_MODAL
} from '../constants/modaltypes'
import Spinner from 'react-spinkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

interface IProps extends RouteProps {
  username: any
  quiz: any
  questionNumber: any
  multipleSelectAnswer: any
  multipleChoiceAnswer: any[]
  answerArray: any
  history?: any
  loadModal: (type: string, title?: string, uuid?: string) => void
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

export class TakeQuizPage extends Component<IProps, any> {
  constructor(props) {
    super(props)
  }
  state = {
    dropdownOpen: false
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  toggleDropdown = () =>
    this.setState((prevState: any) => ({
      dropdownOpen: !prevState.dropdownOpen
    }))

  submitQuizModal = () => this.props.loadModal(SUBMIT_QUIZ_MODAL)

  public reportQuestionModal = questionUUID => e => {
    console.log('reporting question', questionUUID)
    this.props.loadModal(REPORT_QUESTION_MODAL, null, questionUUID)
  }

  // will take you to the previous question and update answer array
  // if a choice is selected
  public previousQuizQuestion = (choices: object) => (e: any) => {
    e.preventDefault()
    if (
      this.props.multipleSelectAnswer.answer.length > 0 ||
      this.props.multipleChoiceAnswer !== null
    ) {
      if (
        choices[this.props.questionNumber].format === 'multiple-choice' ||
        choices[this.props.questionNumber].format === 'true-false'
      ) {
        this.props.startAddAnswerToArray(this.props.multipleChoiceAnswer)
        this.props.changeQuestionNumber(this.props.questionNumber - 1)
      } else if (
        choices[this.props.questionNumber].format === 'multiple-select'
      ) {
        this.props.startAddAnswerToArray(this.props.multipleSelectAnswer)
        this.props.changeQuestionNumber(this.props.questionNumber - 1)
      }
    } else {
      this.props.changeQuestionNumber(this.props.questionNumber - 1)
    }
  }
  // will take you to the next question and update answer array
  // if a choice is selected
  public nextQuizQuestion = (choices: object) => (e: any) => {
    e.preventDefault()
    console.log('here on submit', choices[this.props.questionNumber].format)
    if (
      this.props.multipleSelectAnswer.answer.length > 0 ||
      this.props.multipleChoiceAnswer !== null
    ) {
      if (
        choices[this.props.questionNumber].format === 'multiple-choice' ||
        choices[this.props.questionNumber].format === 'true-false'
      ) {
        this.props.startAddAnswerToArray(this.props.multipleChoiceAnswer)
        this.props.changeQuestionNumber(this.props.questionNumber + 1)
      } else if (
        choices[this.props.questionNumber].format === 'multiple-select'
      ) {
        this.props.startAddAnswerToArray(this.props.multipleSelectAnswer)
        this.props.changeQuestionNumber(this.props.questionNumber + 1)
      }
    } else {
      this.props.changeQuestionNumber(this.props.questionNumber + 1)
    }
  }

  // adds an answer to the answer array if the question has not already
  // been answered if it has the answer will be updated
  public addAnswerToObject = (choices: object, answer: any) => {
    let index
    let newArrayAnswers
    let newArray
    switch (choices[this.props.questionNumber].format) {
      case 'multiple-choice':
        console.log(this.props.answerArray)
        if (
          this.props.answerArray.some((obj, i) => {
            if (obj.title === choices[this.props.questionNumber].title) {
              console.log('checking answerArray')
              console.log(obj.title)
              index = i
              return true
            }
          })
        ) {
          let newArray = this.props.answerArray
          newArray.splice(index, 1)
          console.log(newArray)
          updateAnswerArray({
            newArray
          })
        }
        this.props.addMultipleChoiceAnswer({
          author: choices[this.props.questionNumber].author,
          title: choices[this.props.questionNumber].title,
          answer: answer.answer.answer,
          selected: true
        })
        break
      case 'multiple-select':
        if (
          this.props.answerArray.some((obj, i) => {
            if (obj.title === choices[this.props.questionNumber].title) {
              console.log('checking answerArray')
              console.log(obj.title)
              index = i
              return true
            }
          })
        ) {
          newArrayAnswers = this.props.answerArray[index].answer
          this.props.addMultipleSelectAnswer({
            author: choices[this.props.questionNumber].author,
            title: choices[this.props.questionNumber].title,
            answer: newArrayAnswers
          })
          console.log(newArrayAnswers)
          // CLEARS ANSWERARRAY
          let newArray = this.props.answerArray
          newArray.splice(index, 1)
          updateAnswerArray({
            newArray
          })
        }

        if (
          this.props.multipleSelectAnswer.answer.includes(
            answer.answer.answer
          ) ||
          (newArrayAnswers !== undefined &&
            newArrayAnswers.includes(answer.answer.answer))
        ) {
          console.log('found a match, now remove it', answer.answer.answer)
          if (newArrayAnswers !== undefined) {
            const index = newArrayAnswers.indexOf(answer.answer.answer)
            newArray = newArrayAnswers
            newArray.splice(index, 1)
            this.props.addMultipleSelectAnswer({
              author: choices[this.props.questionNumber].author,
              title: choices[this.props.questionNumber].title,
              answer: newArray
            })
          } else {
            const index = this.props.multipleSelectAnswer.answer.indexOf(
              answer.answer.answer
            )
            newArray = this.props.multipleSelectAnswer.answer
            console.log(newArray)
            newArray.splice(index, 1)
            this.props.addMultipleSelectAnswer({
              author: choices[this.props.questionNumber].author,
              title: choices[this.props.questionNumber].title,
              answer: newArray
            })
          }
        } else {
          newArray = this.props.multipleSelectAnswer.answer
          console.log(newArray)
          newArrayAnswers !== undefined &&
            newArrayAnswers.push(answer.answer.answer)
          console.log(newArrayAnswers)
          newArray.push(answer.answer.answer)
          this.props.addMultipleSelectAnswer({
            author: choices[this.props.questionNumber].author,
            title: choices[this.props.questionNumber].title,
            answer: newArrayAnswers !== undefined ? newArrayAnswers : newArray
          })
        }
        break

      case 'true-false':
        console.log(this.props.answerArray)
        if (
          this.props.answerArray.some((obj, i) => {
            if (obj.title === choices[this.props.questionNumber].title) {
              console.log('checking answerArray')
              console.log(obj.title)
              index = i
              return true
            }
          })
        ) {
          let newArray = this.props.answerArray
          newArray.splice(index, 1)
          console.log(newArray)
          updateAnswerArray({
            newArray
          })
        }
        this.props.addMultipleChoiceAnswer({
          author: choices[this.props.questionNumber].author,
          title: choices[this.props.questionNumber].title,
          answer: answer.answer.answer,
          selected: true
        })
        break
    }
  }

  public submit = (choices: object) => (e: any) => {
    console.log('in submit function')
    if (
      this.props.multipleSelectAnswer.answer.length > 0 ||
      this.props.multipleChoiceAnswer !== null
    ) {
      if (
        choices[this.props.questionNumber].format === 'multiple-choice' ||
        choices[this.props.questionNumber].format === 'true-false'
      ) {
        this.props.startAddAnswerToArray(this.props.multipleChoiceAnswer)
      } else if (
        choices[this.props.questionNumber].format === 'multiple-select'
      ) {
        this.props.startAddAnswerToArray(this.props.multipleSelectAnswer)
      }
    }
    this.submitQuizModal()
  }

  // @ts-ignore
  render = () => {
    const { quiz, questionNumber } = this.props
    return (
      <div className="take-quiz-page">
        {quiz.questions === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {quiz.questions !== undefined && (
          <div className="main">
            <header>
              <div className="meta">
                <div className="container">
                  <p className="current">Question {questionNumber + 1}</p>
                  <div className="icon">
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggleDropdown}
                      className="app-dropdown-root"
                    >
                      <DropdownToggle className="dropdown-toggle">
                        <FontAwesomeIcon icon="ellipsis-h" className="menu" />
                      </DropdownToggle>
                      <DropdownMenu
                        left="true"
                        className="dropdown-menu"
                        style={{
                          display: this.state.dropdownOpen ? 'block' : 'none'
                        }}
                      >
                        <DropdownItem
                          className="dropdown-item"
                          onClick={this.reportQuestionModal(
                            this.props.quiz.questions[questionNumber].uuid
                          )}
                        >
                          Report question
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <p className="title">{quiz.title}</p>
                <p className="progress">
                  Question {questionNumber + 1}/{quiz.questions.length}
                </p>
              </div>
              <p className="question">{quiz.questions[questionNumber].title}</p>
            </header>
            {/* DISPLAYS THE CHOICES */}
            <main>
              <div className="choices">
                {quiz.questions[questionNumber].answers.map((answers, i) => (
                  <div
                    key={i}
                    // key={answers.answer.answer}
                    className="choice"
                    onClick={this.addAnswerToObject.bind(
                      this,
                      quiz.questions,
                      answers
                    )}
                  >
                    <p>{answers.answer.answer}</p>
                  </div>
                ))}
              </div>
              <div>
                {quiz.questions[questionNumber].image !== undefined && (
                  <ImageGallery
                    items={[
                      {
                        original: quiz.questions[questionNumber].image,
                        thumbnail: quiz.questions[questionNumber].image
                      }
                    ]}
                    showThumbnails={false}
                    showPlayButton={false}
                    showImageFullScreenButton
                    alt="question image"
                  />
                )}
              </div>
              <div className="buttons">
                {questionNumber !== 0 && (
                  <button
                    onClick={this.previousQuizQuestion(quiz.questions)}
                    className="previous-button"
                  >
                    previous
                  </button>
                )}
                {questionNumber + 1 !== quiz.questions.length ? (
                  <button
                    onClick={this.nextQuizQuestion(quiz.questions)}
                    className="next-button"
                  >
                    next
                  </button>
                ) : (
                  <button
                    onClick={this.submit(quiz.questions)}
                    className="submit-button"
                  >
                    Done
                  </button>
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
  quiz:
    state.takeQuiz.quizAttemptInfoObj !== null &&
    state.takeQuiz.quizAttemptInfoObj,
  answers: state.takeQuiz.answers,
  answerArray: state.takeQuiz.answerArray,
  questionNumber: state.takeQuiz.questionNumber,
  multipleSelectAnswer: state.takeQuiz.multipleSelectAnswer,
  multipleChoiceAnswer: state.takeQuiz.multipleChoiceAnswer
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
    loadModal
  }
)(TakeQuizPage)