import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { RouteProps } from 'react-router'
import { Link } from 'react-router-dom'
import SubmitQuizModal from './modals/SubmitQuizModal'
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
import { SUBMIT_QUIZ_MODAL } from '../constants/modaltypes'
import Spinner from 'react-spinkit'

interface IProps extends RouteProps {
  username: any
  quiz: any
  questionNumber: any
  multipleSelectAnswer: any
  multipleChoiceAnswer: any[]
  answerArray: any
  history: any
  done: any
  loadModal: any
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

export class TakeQuizPage extends Component<IProps, any> {
  constructor(props) {
    super(props)
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  submitQuizModal = () => this.props.loadModal(SUBMIT_QUIZ_MODAL)

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

  public addAnswerToObject = (choices: object, answer: any) => {
    let index
    switch (choices[this.props.questionNumber].format) {
      case 'multiple-choice':
        // console.log(choices[this.props.questionNumber])
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
            newArray,
            done: false
          })
        }
        this.props.addMultipleChoiceAnswer({
          author: choices[this.props.questionNumber].author,
          title: choices[this.props.questionNumber].title,
          answer: answer.answer.answer,
          done: false
        })
        break
      case 'multiple-select':
        // console.log(this.props.answerArray)
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
            newArray,
            done: false
          })
        }
        let newArray: any[]
        if (
          this.props.multipleSelectAnswer.answer.includes(answer.answer.answer)
        ) {
          console.log('found a match, now remove it', answer.answer.answer)
          const index = this.props.multipleSelectAnswer.answer.indexOf(
            answer.answer.answer
          )
          newArray = this.props.multipleSelectAnswer.answer
          newArray.splice(index, 1)
          this.props.addMultipleSelectAnswer({
            author: choices[this.props.questionNumber].author,
            title: choices[this.props.questionNumber].title,
            answer: newArray,
            done: false
          })
        } else {
          newArray = this.props.multipleSelectAnswer.answer
          newArray.push(answer.answer.answer)
          this.props.addMultipleSelectAnswer({
            author: choices[this.props.questionNumber].author,
            title: choices[this.props.questionNumber].title,
            answer: newArray,
            done: false
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
            newArray,
            done: false
          })
        }
        this.props.addMultipleChoiceAnswer({
          author: choices[this.props.questionNumber].author,
          title: choices[this.props.questionNumber].title,
          answer: answer.answer.answer,
          done: false
        })
        break
    }
  }

  // public convertAsyncToSync = async func =>
  //   new Promise(async resolve => {
  //     await func()
  //     resolve()
  //   })

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

    // console.log('here')
    // const addFinalQuestion = async () => {
    //   if (
    //     this.props.multipleSelectAnswer.answer.length > 0 ||
    //     this.props.multipleChoiceAnswer !== null
    //   ) {
    //     if (
    //       choices[this.props.questionNumber].format === 'multiple-choice' ||
    //       choices[this.props.questionNumber].format === 'true-false'
    //     ) {
    //       this.props.startAddAnswerToArray(this.props.multipleChoiceAnswer)
    //     } else if (
    //       choices[this.props.questionNumber].format === 'multiple-select'
    //     ) {
    //       this.props.startAddAnswerToArray(this.props.multipleSelectAnswer)
    //     }
    //   }
    // }
    // this.convertAsyncToSync(addFinalQuestion).then(() => {
    //   console.log('store should now be updated')
    //   console.log(
    //     this.quizUUID,
    //     this.props.username,
    //     this.props.quiz.attemptUUID,
    //     this.props.answerArray
    //   )

    //   this.props.submitQuizAttempt(
    //     this.quizUUID,
    //     this.props.username,
    //     this.props.quiz.attemptUUID,
    //     this.props.answerArray
    //   )
    //   this.props.history.push('/quiz-results')
    // })
  }

  // @ts-ignore
  componentDidMount = () => console.log('checking done..', this.props.done)

  // @ts-ignore
  componentWillReceiveProps = (props, nextProps) => {
    console.log(
      'did component receive props yet? Is done true?',
      this.props.done
    )
    console.log('old props', props)
    console.log('new props', nextProps)
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
                <p className="current">Question {questionNumber + 1}</p>
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
                {quiz.questions[questionNumber].answers.map(answers => (
                  <div
                    key={answers.answer.answer}
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
                    // onClick={this.submitQuizModal}
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
  // quiz: state.takeQuiz.quizAttemptInfoObj,
  quiz:
    state.takeQuiz.quizAttemptInfoObj !== null &&
    state.takeQuiz.quizAttemptInfoObj,
  answers: state.takeQuiz.answers,
  answerArray: state.takeQuiz.answerArray,
  questionNumber: state.takeQuiz.questionNumber,
  multipleSelectAnswer: state.takeQuiz.multipleSelectAnswer,
  multipleChoiceAnswer: state.takeQuiz.multipleChoiceAnswer,
  done: state.takeQuiz.done
  // clickedQuestion: state.quizzes.clickedQuestion
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
