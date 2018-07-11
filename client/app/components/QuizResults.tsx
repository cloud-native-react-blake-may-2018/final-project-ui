import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  startAddAnswerToArray,
  changeQuestionNumber,
  addMultipleSelectAnswer,
  addMultipleChoiceAnswer,
  updateMultipleSelectAnswer,
  updateAnswerArray
} from '../actions/quizzes'
import Spinner from 'react-spinkit'

interface IProps {
  username: any
  quiz: any
  questionNumber: any
  multipleSelectAnswer: any
  multipleChoiceAnswer: any[]
  answerArray: any
  changeQuestionNumber: (questionNumber: number) => void
  startAddAnswerToArray: (answerObj: {}) => void
  addMultipleChoiceAnswer: (answerObj: {}) => void
  addMultipleSelectAnswer: (answerObj: {}) => void
  updateMultipleSelectAnswer: (answerArray: any[]) => void
  updateAnswerArray: (answerArray: any[]) => void
}

export class QuizResultsPage extends Component<IProps, any> {
  constructor(props) {
    super(props)
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  // @ts-ignore
  render = () => {
    const { quiz } = this.props
    return (
      <div className="quiz-results-page">
        {console.log(this.props.quiz)}
        <h1>Your Results</h1>
        <h1>{this.props.quiz.score}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz: state.takeQuiz.results !== null && state.takeQuiz.results
})

export default connect(
  mapStateToProps,
  {
    startAddAnswerToArray,
    changeQuestionNumber,
    addMultipleChoiceAnswer,
    addMultipleSelectAnswer,
    updateMultipleSelectAnswer,
    updateAnswerArray
  }
)(QuizResultsPage)
