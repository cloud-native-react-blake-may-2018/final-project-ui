import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startAddAnswerToArray, changeQuestionNumber } from '../actions/quizzes'
import Spinner from 'react-spinkit'

interface IProps {
  username: any
  quiz: any
  answerArray: object[]
  setQuestionNumber: (questionNumber: number) => void
  changeQuestionNumber: (questionNumber: number) => void
  startAddAnswerToArray: (answers: {}) => any
}

const questionStyle = {
  cursor: 'poninter'
}

export class TakeQuizPage extends Component<any, any> {
  constructor(props) {
    super(props)
  }
  state = {
    clickedQuestion: [],
    questionNumber: 0,
    answerTrueFalseOrMultipleChoice: {
      author: '',
      title: '',
      answer: ''
    },
    answerMultipleSelect: {
      author: '',
      title: '',
      answer: []
    }
  }

  params = window.location.href.split('/')
  quizUUID = this.params[4]

  public previousQuizQuestion = (e: any) => {
    e.preventDefault()
    this.props.changeQuestionNumber(this.props.questionNumber - 1)
  }
  public nextQuizQuestion = (choices: object) => {
    console.log(choices[this.props.questionNumber].format)
    if (
      choices[this.props.questionNumber].format === 'multiple-choice' ||
      choices[this.props.questionNumber].format === 'true-false'
    ) {
      this.props.startAddAnswerToArray(
        this.state.answerTrueFalseOrMultipleChoice
      )
      this.props.changeQuestionNumber(this.props.questionNumber + 1)
      console.log(this.props.questionNumber)
    } else if (
      choices[this.props.questionNumber].format === 'multiple-select'
    ) {
      this.props.startAddAnswerToArray(this.state.answerMultipleSelect)
      console.log(this.props.questionNumber)
      this.props.changeQuestionNumber(this.props.questionNumber + 1)
    }
  }

  public addAnswerToObject = (choices: object, answer: any) => {
    switch (choices[this.state.questionNumber].format) {
      case 'multiple-choice':
        this.setState({
          ...this.state,
          answerTrueFalseOrMultipleChoice: {
            author: choices[this.props.questionNumber].author,
            title: choices[this.props.questionNumber].title,
            answer: answer.answer
          }
        })
        console.log(this.state.answerTrueFalseOrMultipleChoice)
        break
      case 'multiple-select':
        if (this.state.answerMultipleSelect.answer.includes(answer.answer)) {
          const index = this.state.answerMultipleSelect.answer.indexOf(
            answer.answer
          )
          this.state.answerMultipleSelect.answer.splice(index, 1)
          this.setState({
            ...this.state,
            answerMultipleSelect: {
              author: choices[this.props.questionNumber].author,
              title: choices[this.props.questionNumber].title,
              answer: this.state.answerMultipleSelect.answer
            }
          })
        } else {
          this.setState({
            ...this.state,
            answerMultipleSelect: {
              author: choices[this.props.questionNumber].author,
              title: choices[this.props.questionNumber].title,
              answer: [...this.state.answerMultipleSelect.answer, answer.answer]
            }
          })
        }
        // console.log(this.state.answerMultipleSelect)
        break

      case 'true-false':
        this.setState({
          ...this.state,
          answerTrueFalseOrMultipleChoice: {
            author: choices[this.props.questionNumber].author,
            title: choices[this.props.questionNumber].title,
            answer: answer.answer
          }
        })
        // console.log(this.state.answerTrueFalseOrMultipleChoice)
        break
    }
  }

  public submit = () => {
    console.log(this.props.answerArray)
  }

  render() {
    const { quiz } = this.props
    console.log('in render' + this.props.questionNumber)
    return (
      <div className="viewQuizzes-page">
        {quiz.questions === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {quiz.questions !== undefined && (
          <div>
            {/* DISPLAYS QUIZ TITLE */}
            <h1>{quiz.title}</h1>
            {/* DISPLAYS WHAT QUESTION NUMBER THE USER IS ON */}
            <h3>Question {this.props.questionNumber + 1}</h3>
            {/* DISPLAYS THE QUESTION */}
            <h5>{quiz.questions[this.props.questionNumber].title}</h5>
            {/* DISPLAYS THE QUESTION NUMBER THEY ARE ON OUT OF TOTAL */}
            <h3>
              Question {this.props.questionNumber + 1}/{quiz.questions.length}
            </h3>
            {/* DISPLAYS THE CHOICES */}
            <div>
              {/* {console.log(quiz.questions)} */}
              {quiz.questions[this.props.questionNumber].answers.map(
                answers => (
                  <div style={questionStyle} key={answers.answer}>
                    <p
                      onClick={this.addAnswerToObject.bind(
                        this,
                        quiz.questions,
                        answers
                      )}
                    >
                      {answers.answer}
                    </p>
                  </div>
                )
              )}
            </div>

            {this.props.questionNumber !== 0 ? (
              <button onClick={this.previousQuizQuestion}>previous</button>
            ) : null}
            {this.props.questionNumber + 1 !== quiz.questions.length ? (
              <button
                onClick={this.nextQuizQuestion.bind(this, quiz.questions)}
              >
                next
              </button>
            ) : (
              <button onClick={this.submit}>Submit</button>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  username: state.auth.username,
  quiz:
    state.quizzes.all !== undefined &&
    state.quizzes.all.find(quiz => quiz.uuid === props.match.params.uuid),
  answers: state.quizzes.answers,
  questionNumber: state.takeQuiz.questionNumber
  // clickedQuestion: state.quizzes.clickedQuestion
})

export default connect(
  mapStateToProps,
  { startAddAnswerToArray, changeQuestionNumber }
)(TakeQuizPage)
